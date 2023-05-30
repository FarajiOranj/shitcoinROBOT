import { Context } from "telegraf";
import { SessionContext } from "telegraf/typings/session";
import { backToMenu, mainMenu, trackMenu } from "../layout/layout";
import { TrackSession } from "../../../public/types/sessionTypes";
import { trackOpts, fromAddres, toAddress, bothPairedWarn, fromSubmitted, reqSent } from "../../../public/static/trackUx";
import { menuMessage } from "../../../public/static/starterUserUx";
import deleteAvailableMsg from "../../helper/deleteMsg";
import { PairStat } from "../../../public/types/transaction";
import storeKeyID from "../../helper/sessionKey.store";

const trackCB = (ctx: Context) => {
  deleteAvailableMsg(ctx);
  ctx.telegram.sendMessage(ctx.chat.id, trackOpts, trackMenu).then(storeKeyID(ctx));
};

//TODO! change "any" type later to an accurate type
const pairOptSaver = (ctx: SessionContext<any>) => {
  deleteAvailableMsg(ctx);
  const chatId: number = ctx.chat.id;
  const data: string = ctx.callbackQuery?.["data"];

  //* maybe should change or move
  ctx.session.trackSession = {} as TrackSession;

  ctx.session.trackSession.userId = chatId;
  ctx.session.trackSession.triggerType = data;
  ctx.session.trackSession.commonStat = "trackNotifier";

  const message: string = data === "toPaired" ? toAddress : fromAddres;

 /* TODO
  ! needs more researches to use - untested
  let data: string;
  if (ctx.has(callbackQuery("data"))) {
    data = ctx.callbackQuery.data // works!;
  }
  ctx.session.triggerType = data; 
  */

  ctx.telegram.sendMessage(chatId, message, backToMenu).then(storeKeyID(ctx));
}

//TODO! change "any" type later to an accurate type
const AddrAnalysis = async (ctx: SessionContext<any>) => {
  const triggerType: PairStat = ctx.session.trackSession.triggerType;
  const givenAddress: string = ctx.message["text"];

  deleteAvailableMsg(ctx);

  let sendAcceptionNotif: boolean;
  let continuousMsg: string;

  if(triggerType !== "toPaired") {
    if(ctx.session.trackSession?.fromAddr) {
      if(
        triggerType === "bothPaired" && 
        (ctx.session.trackSession.fromAddr === givenAddress)
      ) {
        continuousMsg = bothPairedWarn;
      } else {
        ctx.session.trackSession.toAddr = givenAddress;
        sendAcceptionNotif = true;
      }
    } else {
      ctx.session.trackSession.fromAddr = givenAddress;
      if(triggerType === "fromPaired") sendAcceptionNotif = true;
      else {
        ctx.telegram.sendMessage(ctx.chat.id, fromSubmitted, {reply_to_message_id: ctx.message.message_id});
        continuousMsg = toAddress;
      }
    }
  } else {
    ctx.session.trackSession.toAddr = givenAddress;
    sendAcceptionNotif = true;
  }
  if (sendAcceptionNotif) {
    ctx.session.trackSession.completed = true;
    await ctx.telegram.sendMessage(ctx.chat.id, reqSent, {reply_to_message_id: ctx.message.message_id});
    ctx.telegram.sendMessage(ctx.chat.id, menuMessage, mainMenu).then(storeKeyID(ctx));
  } else ctx.telegram.sendMessage(ctx.chat.id, continuousMsg, backToMenu).then(storeKeyID(ctx));
}

export default trackCB;
export {
  pairOptSaver,
  AddrAnalysis
}