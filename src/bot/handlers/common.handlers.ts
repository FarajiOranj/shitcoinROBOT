import { SessionContext } from "telegraf/typings/session";
import { mainMenu } from "../layout/layout";
import {
  starterMessage,
  menuMessage,
} from "../../../public/static/starterUserUx";
import storeKeyID from "../../helper/sessionKey.store";
import deleteAvailableMsg from "../../helper/deleteMsg";
import redisClient from "../../session/redis.session";

const menuCB = async (ctx: SessionContext<any>) => {
  await deleteAvailableMsg(ctx);

  // if (!ctx?.session) {
  //   ctx.session = {} as Object;
  //   ctx.session.underProcesses = {} as Object;
  // }

  redisClient.hset(`${ctx.from.id}:${ctx.chat.id}`,{underProcesses: {newUniPair: false}});
  redisClient.hget(`${ctx.from.id}:${ctx.chat.id}`,"underProcesses");

  const message: string =
    (ctx.update as any)?.message?.text === "/start"
      ? starterMessage(ctx.from.first_name)
      : menuMessage;

  await ctx.telegram
    .sendMessage(ctx.chat.id, message, mainMenu)
    .then((msg) => storeKeyID(ctx, msg.message_id));
};

export { menuCB };
