import { SessionContext } from "telegraf/typings/session";
import bot from "../bot.instance";
import { mainMenu } from "../layout/layout";
import {
  starterMessage,
  menuMessage,
} from "../../../public/static/starterUserUx";


const menuCB = (ctx: SessionContext<any>) => {
  ctx.deleteMessage();
  ctx.session = null;
  const message: string = (ctx.update as any)?.message?.text === "/start"
      ? starterMessage(ctx.from.first_name)
      : menuMessage;

  bot.telegram.sendMessage(ctx.chat.id, message, mainMenu);
};
export { menuCB };
