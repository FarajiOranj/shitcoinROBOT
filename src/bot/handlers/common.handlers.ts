import { SessionContext } from "telegraf/typings/session";
import { mainMenu } from "../layout/layout";
import {
  starterMessage,
  menuMessage,
} from "../../../public/static/starterUserUx";
import storeKeyID from "../../helper/sessionKey.store";
import deleteAvailableMsg from "../../helper/deleteMsg";

const menuCB = (ctx: SessionContext<any>) => {
  deleteAvailableMsg(ctx);

  if(!ctx?.session) ctx.session = {} as Object;

  const message: string =
    (ctx.update as any)?.message?.text === "/start"
      ? starterMessage(ctx.from.first_name)
      : menuMessage;

  ctx.telegram
    .sendMessage(ctx.chat.id, message, mainMenu)
    .then(storeKeyID(ctx));
};

export { menuCB };
