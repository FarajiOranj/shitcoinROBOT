import { SessionContext } from "telegraf/typings/session";
import userRegistration from "../../helper/session/userRegistration.session";
import { multipleSetter } from "../../session/setter";
import deleteAvailableMsg from "../../helper/message/delete.msg";
import storeMsgId from "../../helper/message/storeId.msg";
import { mainMenu } from "../layout/layout";
import {
  starterMessage,
  menuMessage,
} from "../../../public/static/starterUserUx";

const menuCB = async (ctx: SessionContext<any>) => {
  await deleteAvailableMsg(ctx);

  const { registeredBefore, hashedKey } = await userRegistration(ctx);

  if (registeredBefore) console.log("User Subscribed Before.");
  else {
    console.log("User Subscribed Right Now!");

    multipleSetter(ctx, {
      keyId: null,
      underProcesses: {
        uniNewPair: 0,
        whaleTracker: 0,
      },
      tracker: {
        commonStat: null,
        triggerType: null,
        fromAddr: null,
        toAddr: null,
        completed: false,
      },
    });
  }

  console.log("User Hashed Key: ", hashedKey);

  const message: string =
    (ctx.update as any)?.message?.text === "/start"
      ? starterMessage(ctx.from.first_name)
      : menuMessage;

  await ctx.telegram
    .sendMessage(ctx.chat.id, message, mainMenu)
    .then((msg) => storeMsgId(ctx, msg.message_id));
};

export { menuCB };
