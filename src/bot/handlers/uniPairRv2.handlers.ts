import { SessionContext } from "telegraf/typings/session";
import { backToMenu } from "../layout/layout";
import storeKeyID from "../../helper/message/storeId.msg";
import deleteAvailableMsg from "../../helper/message/delete.msg";
import findUniV2Pairs from "../../jobs/uni/pairFinderV2";
import {
  uniPairNums,
  reqSent,
  willSentPairs,
} from "../../../public/static/trackUx";
import { TrackSession } from "../../../public/types/sessionTypes";
import { singleGetter } from "../../session/getter";
import { singleSetter } from "../../session/setter";


const tracker = "tracker";
const underProcesses = "underProcesses";

const newUniPair = async (ctx: SessionContext<any>) => {
  await deleteAvailableMsg(ctx);

  let updatedValue =  await singleGetter(ctx, tracker);
  updatedValue["commonStat"] = "uniPair";
  singleSetter(ctx, tracker, updatedValue);

  await ctx.telegram
    .sendMessage(ctx.chat.id, uniPairNums, backToMenu)
    .then((msg) => storeKeyID(ctx, msg.message_id));
};

const givenPairNum = async (ctx: SessionContext<any>) => {
  await deleteAvailableMsg(ctx);

  let updatedValue =  await singleGetter(ctx, tracker);
  updatedValue["completed"] = true;
  singleSetter(ctx, tracker, updatedValue);

  let updatedProcess =  await singleGetter(ctx, underProcesses);
  updatedProcess["uniNewPair"] = true;
  singleSetter(ctx, underProcesses, updatedProcess);

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
