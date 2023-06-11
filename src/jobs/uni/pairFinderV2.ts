import minedTxTracker from "../../provider/minedTracker";
import ITxData, { IWsData } from "../../../public/types/transaction";
import uniPairV2 from "../../bot/server-reply/uniPairV2.reply";
import * as dotenv from "dotenv";
dotenv.config();

const findUniV2Pairs = async (chatId: number, totalPairs: number) => {
  minedTxTracker({
    to: process.env.UNI_ROUTE2,
    callback: (txData: ITxData, wsData: IWsData) =>
      uniPairV2(txData, wsData, chatId, totalPairs),
  });
};

export default findUniV2Pairs;
