import { Context } from "telegraf";
// import { callbackQuery } from "telegraf/filters";
import { SessionContext } from "telegraf/typings/session";
import bot from "../bot.instance";
import { backToMenu, trackMenu } from "../layout/layout";
import trackSession from "../../../public/types/trackSession";
import { trackOpts, fromAddres, toAddress } from "../../../public/static/trackUx";

const trackCB = (ctx: Context) => {
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, trackOpts, trackMenu);
};

const pairOptSaver = (ctx: SessionContext<trackSession>) => {
  ctx.deleteMessage();
  const chatId: number = ctx.chat.id;
  const data: string = ctx.callbackQuery?.["data"];

  ctx.session = {} as trackSession;
  
  ctx.session.userId = chatId;
  ctx.session.triggerType = data;

  const message: string = data === "toPaired" ? toAddress : fromAddres;

 /* 
  needs more researches to use - untested
  let data: string;
  if (ctx.has(callbackQuery("data"))) {
    data = ctx.callbackQuery.data // works!;
  }
  ctx.session.triggerType = data; 
  */

  ctx.telegram.sendMessage(chatId, message, backToMenu);
}

bot.hears("a", (ctx: SessionContext<trackSession>) => {
  ctx.telegram.sendMessage(ctx.chat.id, `${ctx.session.triggerType}`);
});

export default trackCB;
export {
  pairOptSaver
}