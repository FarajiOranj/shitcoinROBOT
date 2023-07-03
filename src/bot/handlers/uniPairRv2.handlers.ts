import { SessionContext } from "telegraf/typings/session";
import { backToMenu } from "../layout/layout";
import storeKeyID from "../../helper/sessionKey.store";
import deleteAvailableMsg from "../../helper/deleteMsg";
import findUniV2Pairs from "../../jobs/uni/pairFinderV2";
import {
  uniPairNums,
  reqSent,
  willSentPairs,
} from "../../../public/static/trackUx";
import { TrackSession } from "../../../public/types/sessionTypes";

const newUniPair = async (ctx: SessionContext<any>) => {
  await deleteAvailableMsg(ctx);

  ctx.session.trackSession = {} as TrackSession;
  ctx.session.trackSession.commonStat = "uniPair";

  await ctx.telegram
    .sendMessage(ctx.chat.id, uniPairNums, backToMenu)
    .then((msg) => storeKeyID(ctx, msg.message_id));
};

const givenPairNum = async (ctx: SessionContext<any>) => {
  await deleteAvailableMsg(ctx);

  ctx.session.trackSession.completed = true;
  ctx.session.underProcesses["uniNewPair"] = true;

  const chatId: number = ctx.chat.id;
  const totalPairs: number = Number(ctx.message["text"]);

  await ctx.telegram.sendMessage(chatId, reqSent, {
    reply_to_message_id: ctx.message.message_id,
  });

  await ctx.telegram
    .sendMessage(chatId, willSentPairs(totalPairs), backToMenu)
    .then((msg) => storeKeyID(ctx, msg.message_id));

  findUniV2Pairs(ctx, chatId, totalPairs);
};

export default newUniPair;
export { givenPairNum };
