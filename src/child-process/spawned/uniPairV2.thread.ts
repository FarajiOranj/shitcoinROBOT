import { parentPort } from "worker_threads";
import minedTxTracker from "../../provider/minedTracker";
import ITxData, { IWsData } from "../../../public/types/transaction";
import uniPairV2 from "../../bot/server-reply/uniPairV2.reply";

parentPort.on("message", (value) => {
  minedTxTracker({
    to: process.env.UNI_ROUTE2,
    callback: (txData: ITxData, wsData: IWsData) =>
      uniPairV2(txData, wsData, value[0], value[1]),
  });
});
