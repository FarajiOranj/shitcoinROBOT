import minedTxTracker from "../../provider/minedTracker";
import ITxData from "../../../public/types/transaction";
import uniPairV2  from "../../bot/server-reply/uniPairV2.reply";
import * as dotenv from "dotenv";
dotenv.config();

const findUniV2Pairs = async (chatId: number, totalPairs: number) => {
  minedTxTracker({
    to: process.env.UNI_ROUTE2,
    callback: (txData: ITxData, calledTimes: { value: number }): boolean =>
      uniPairV2(txData, calledTimes, chatId, totalPairs),
  });
};

export default findUniV2Pairs;
