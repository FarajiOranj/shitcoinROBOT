import { SessionContext } from "telegraf/typings/session";
import { mainMenu, backToMenu } from "../layout/layout";
import storeKeyID from "../../helper/sessionKey.store";
import deleteAvailableMsg from "../../helper/deleteMsg";
import findUniV2Pairs from "../../jobs/uni/pairFinderV2";
import { menuMessage } from "../../../public/static/starterUserUx";
import { uniPairNums, reqSent, willSentPairs } from "../../../public/static/trackUx";
import { TrackSession } from "../../../public/types/sessionTypes";

const newUniPair = (ctx: SessionContext<any>) => {
  deleteAvailableMsg(ctx);

  ctx.session.trackSession = {} as TrackSession;
  ctx.session.trackSession.commonStat = "uniPair";

  ctx.telegram
    .sendMessage(ctx.chat.id, uniPairNums, backToMenu)
    .then(storeKeyID(ctx));
};

const givenPairNum = async (ctx: SessionContext<any>) => {
  deleteAvailableMsg(ctx);

  ctx.session.trackSession.completed = true;
  ctx.session.underProccess["uniNewPair"] = true;

  const chatId: number = ctx.chat.id;
  const totalPairs: number = Number(ctx.message["text"]);

  await ctx.telegram
  .sendMessage(chatId, reqSent, {
    reply_to_message_id: ctx.message.message_id,
  });

  await ctx.telegram
  .sendMessage(chatId, willSentPairs(totalPairs));

  findUniV2Pairs(ctx, chatId, totalPairs);

  ctx.telegram.sendMessage(chatId, menuMessage, mainMenu).then(storeKeyID(ctx));
};

export default newUniPair;
export { givenPairNum };
