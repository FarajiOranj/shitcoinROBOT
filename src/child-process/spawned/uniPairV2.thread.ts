import minedTxTracker from "../../provider/minedTracker";
import ITxData, { IWsData } from "../../../public/types/transaction";
import uniPairV2 from "../../bot/server-reply/uniPairV2.reply";

minedTxTracker({
  to: process.env.UNI_ROUTE2,
  callback: (txData: ITxData, wsData: IWsData) =>
    uniPairV2(
      txData,
      wsData,
      Number(process.argv[2]),
      Number(process.argv[3])
    ),
});
