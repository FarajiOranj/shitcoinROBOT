import { SessionContext } from "telegraf/typings/session";
import { mainMenu } from "../layout/layout";
import {
  starterMessage,
  menuMessage,
} from "../../../public/static/starterUserUx";
import deleteAvailableMsg from "../../helper/deleteMsg";
import storeKeyID from "../../helper/sessionKey.store";


const menuCB = (ctx: SessionContext<any>) => {
  deleteAvailableMsg(ctx);
  ctx.session = null;
  const message: string = (ctx.update as any)?.message?.text === "/start"
      ? starterMessage(ctx.from.first_name)
      : menuMessage;

  ctx.telegram.sendMessage(ctx.chat.id, message, mainMenu).then(storeKeyID(ctx));
};

export { menuCB };
