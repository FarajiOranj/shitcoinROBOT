import { SessionContext } from "telegraf/typings/session";
import { mainMenu } from "../layout/layout";
import {
  starterMessage,
  menuMessage,
} from "../../../public/static/starterUserUx";
// import storeKeyID from "../../helper/session/storeKeyId";
// import deleteAvailableMsg from "../../helper/message/deleteMsg";
import redisClient from "../../session/redis.session";
import userRegistration from "../../helper/session/newUserChecker";

const menuCB = async (ctx: SessionContext<any>) => {
  // await deleteAvailableMsg(ctx);

  userRegistration(ctx).then((isRegistered) => {
    if (isRegistered) console.log("user subscribed right now!");
    else console.log("user subscribed before.");
  });

  // if (!ctx?.session) {
  //   ctx.session = {} as Object;
  //   ctx.session.underProcesses = {} as Object;
  // }

  // const value = {newUniPair: false};

  // await redisClient.hset(hashKey, "underProcesses", JSON.stringify(value));

  // const under = await redisClient.hget(
  //   hashKey,
  //   "underProcesses"
  // );
  // console.log(under);
  // console.log(JSON.parse(under));

  const message: string =
    (ctx.update as any)?.message?.text === "/start"
      ? starterMessage(ctx.from.first_name)
      : menuMessage;

  await ctx.telegram.sendMessage(ctx.chat.id, message, mainMenu);
  // .then((msg) => storeKeyID(ctx, msg.message_id));
};

export { menuCB };
