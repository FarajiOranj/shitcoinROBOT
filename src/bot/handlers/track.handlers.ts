import { Context } from "telegraf";
// import { callbackQuery } from "telegraf/filters";
import { SessionContext } from "telegraf/typings/session";
import bot from "../bot.instance";
import { backToMenu, mainMenu, trackMenu } from "../layout/layout";
import { TrackSession } from "../../../public/types/sessionTypes";
import { trackOpts, fromAddres, toAddress, bothPairedWarn } from "../../../public/static/trackUx";
import { menuMessage } from "../../../public/static/starterUserUx";
import deleteAvailableMsg from "../../helper/deleteMsg";
import { PairStat } from "../../../public/types/transaction";

const trackCB = (ctx: Context) => {
  deleteAvailableMsg(ctx);
  bot.telegram.sendMessage(ctx.chat.id, trackOpts, trackMenu);
};

//TODO! change "any" type later to an accurate type
const pairOptSaver = (ctx: SessionContext<any>) => {
  deleteAvailableMsg(ctx);
  const chatId: number = ctx.chat.id;
  const data: string = ctx.callbackQuery?.["data"];

  //* maybe should change or move
  ctx.session = {} as Object;
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

  ctx.telegram.sendMessage(chatId, message, backToMenu);
}

//TODO! change "any" type later to an accurate type
const AddrAnalysis = (ctx: SessionContext<any>) => {
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
      else continuousMsg = toAddress;
    }
  } else {
    ctx.session.trackSession.toAddr = givenAddress;
    sendAcceptionNotif = true;
  }
  if (sendAcceptionNotif) {
    ctx.session.trackSession.completed = true;
    // only for test - will change
    ctx.reply("درخواست شما ثبت شد");
    ctx.telegram.sendMessage(ctx.chat.id, menuMessage, mainMenu);
  } else ctx.telegram.sendMessage(ctx.chat.id, continuousMsg, backToMenu);
}

export default trackCB;
export {
  pairOptSaver,
  AddrAnalysis
}