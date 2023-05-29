import { SessionContext } from "telegraf/typings/session";
import bot from "../bot.instance";
import { mainMenu } from "../layout/layout";
import {
  starterMessage,
  menuMessage,
} from "../../../public/static/starterUserUx";
import deleteAvailableMsg from "../../helper/deleteMsg";


const menuCB = (ctx: SessionContext<any>) => {
  deleteAvailableMsg(ctx);
  ctx.session = null;
  const message: string = (ctx.update as any)?.message?.text === "/start"
      ? starterMessage(ctx.from.first_name)
      : menuMessage;

  bot.telegram.sendMessage(ctx.chat.id, message, mainMenu);
};

export { menuCB };
