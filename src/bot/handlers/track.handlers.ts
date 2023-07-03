import { Context } from "telegraf";
import { SessionContext } from "telegraf/typings/session";
import { backToMenu, mainMenu, trackMenu } from "../layout/layout";
import { TrackSession } from "../../../public/types/sessionTypes";
import {
  trackOpts,
  fromAddres,
  toAddress,
  bothPairedWarn,
  fromSubmitted,
  reqSent,
  resWillReply,
} from "../../../public/static/trackUx";
import { menuMessage } from "../../../public/static/starterUserUx";
import deleteAvailableMsg from "../../helper/deleteMsg";
import storeKeyID from "../../helper/sessionKey.store";
import { singlePendingTxFinder } from "../../jobs/track/sinlgleTracker";

const trackCB = async (ctx: Context) => {
  await deleteAvailableMsg(ctx);
  await ctx.telegram
    .sendMessage(ctx.chat.id, trackOpts, trackMenu)
    .then(()=>storeKeyID(ctx));
};

//TODO! change "any" type later to an accurate type
const pairOptSaver = async (ctx: SessionContext<any>) => {
  await deleteAvailableMsg(ctx);
  const chatId: number = ctx.chat.id;
  const data: string = ctx.callbackQuery["data"];

  //* maybe should change or move
  ctx.session.trackSession = {} as TrackSession;

  ctx.session.trackSession.triggerType = data;
  ctx.session.trackSession.commonStat = "trackNotifier";

  /* TODO
  ! needs more researches to use - untested
  let data: string;
  if (ctx.has(callbackQuery("data"))) {
    data = ctx.callbackQuery.data // works!;
  }
  ctx.session.triggerType = data; 
  */

  ctx.telegram.sendMessage(chatId, fromAddres, backToMenu).then(() => storeKeyID(ctx));
};

//TODO! change "any" type later to an accurate type
const AddrAnalysis = async (ctx: SessionContext<any>) => {
  const triggerType: boolean =
    ctx.session.trackSession.triggerType === "bothPaired";
  const givenAddress: string = ctx.message["text"];
  const chatId: number = ctx.chat.id;

  await deleteAvailableMsg(ctx);

  let sendAcceptionNotif: boolean;
  let continuousMsg: string;

  if (ctx.session.trackSession?.fromAddr) {
    if (ctx.session.trackSession.fromAddr === givenAddress) {
      continuousMsg = bothPairedWarn;
    } else {
      ctx.session.trackSession.toAddr = givenAddress;
      sendAcceptionNotif = true;
    }
  } else {
    ctx.session.trackSession.fromAddr = givenAddress;
    if (!triggerType) sendAcceptionNotif = true;
    else {
      ctx.telegram.sendMessage(chatId, fromSubmitted, {
        reply_to_message_id: ctx.message.message_id,
      });
      continuousMsg = toAddress;
    }
  }


  if (sendAcceptionNotif) {
    let replyMsgId: number;

    ctx.session.trackSession.completed = true;

    await ctx.telegram.sendMessage(chatId, reqSent, {
      reply_to_message_id: ctx.message.message_id,
    });

    await ctx.telegram
      .sendMessage(
        chatId,
        resWillReply({
          from: ctx.session.trackSession?.fromAddr,
          to: ctx.session.trackSession?.toAddr,
        })
      )
      .then((message) => (replyMsgId = message.message_id));

    singlePendingTxFinder(chatId, replyMsgId, ctx.session.trackSession);

    ctx.telegram
      .sendMessage(chatId, menuMessage, mainMenu)
      .then(() => storeKeyID(ctx));
  } else
    ctx.telegram
      .sendMessage(chatId, continuousMsg, backToMenu)
      .then(() => storeKeyID(ctx));
};

export default trackCB;
export { pairOptSaver, AddrAnalysis };
