import { Context } from "telegraf";
// import { callbackQuery } from "telegraf/filters";
import { SessionContext } from "telegraf/typings/session";
import bot from "../bot.instance";
import { backToMenu, mainMenu, trackMenu } from "../layout/layout";
import { TrackSession } from "../../../public/types/sessionTypes";
import { trackOpts, fromAddres, toAddress, invalidAddress } from "../../../public/static/trackUx";
import Web3 from "web3";
import { menuMessage } from "../../../public/static/starterUserUx";

const trackCB = (ctx: Context) => {
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, trackOpts, trackMenu);
};

const pairOptSaver = (ctx: SessionContext<TrackSession>) => {
  ctx.deleteMessage();
  const chatId: number = ctx.chat.id;
  const data: string = ctx.callbackQuery?.["data"];

  //! maybe should change or move
  ctx.session = {} as TrackSession;
  
  ctx.session.userId = chatId;
  ctx.session.triggerType = data;
  ctx.session.commonStat = "trackNotifier";

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


const AddrAnalysis = (ctx: SessionContext<TrackSession>) => {
  // ctx.deleteMessage();
  
  //TODO! add as middleware
  if(ctx.session?.commonStat) {

    if(!Web3.utils.checkAddressChecksum(ctx.message["text"]))
      ctx.reply(invalidAddress, backToMenu);
  
    if (ctx.session.triggerType !== "toPaired") {

    } else {
      // only for test - will change
      ctx.reply("درخواست شما ثبت شد");

      ctx.telegram.sendMessage(ctx.chat.id, menuMessage , mainMenu);
    }
  }
}
// if(ctx.session?.toAddr) {}
export default trackCB;
export {
  pairOptSaver,
  AddrAnalysis
}