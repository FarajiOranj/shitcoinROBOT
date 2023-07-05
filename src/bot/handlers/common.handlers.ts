import crypto from "crypto";
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
  // await deleteAvailableMsg(ctx);

  // if (!ctx?.session) {
  //   ctx.session = {} as Object;
  //   ctx.session.underProcesses = {} as Object;
  // }

  const hashKey = crypto
    .createHash("sha256")
    .update(`${ctx.from.id}:${ctx.chat.id}`)
    .digest("hex");

  await redisClient.hset(hashKey, "underProcesses", 21);

  const under = await redisClient.hget(
    hashKey,
    "underProcesses"
  );
  console.log(under);

  const message: string =
    (ctx.update as any)?.message?.text === "/start"
      ? starterMessage(ctx.from.first_name)
      : menuMessage;

  await ctx.telegram.sendMessage(ctx.chat.id, message, mainMenu);
  // .then((msg) => storeKeyID(ctx, msg.message_id));
};

export { menuCB };
