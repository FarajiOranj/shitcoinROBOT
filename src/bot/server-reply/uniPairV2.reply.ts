import bot from "../bot.instance";
import { alchemy } from "../../provider/provider";
import getTokenMetadata from "../../utils/tokenMetadata";
import ITxData, {
  IWsData,
  ITrackerFn,
} from "../../../public/types/transaction";
import { uniPairFound } from "../../../public/static/trackUx";
import { uniPairURLs } from "../layout/linker";
import { Log, WebSocketNamespace } from "alchemy-sdk";
import * as dotenv from "dotenv";
dotenv.config();

const { ADDLIQETH_MID, PAIR_EID, WETH } = process.env;

const uniPairV2: ITrackerFn["callback"] = (
  txData: ITxData,
  wsData: IWsData,
  chatId: number,
  totalPairs: number
): void => {
  const input = txData.Input.input ?? "";

  if (input.includes(ADDLIQETH_MID)) {
    const { calledTimes } = wsData;

    let log: Log;
    alchemy.core.getTransactionReceipt(txData.TxInfo.hash).then((res) => {
      log = res.logs.find((log) => log.topics[0] === PAIR_EID);
    });

    if (log) {
      const mainToken: string = log.topics[1].includes(WETH)
        ? `0x${log.topics[2].slice(26)}`
        : `0x${log.topics[1].slice(26)}`;

      const uniPair: string = `0x${log.data.slice(26, 66)}`;

      let  name: string, symbol: string, decimals: number;

      getTokenMetadata(mainToken).then(
        res=> {
          name = res.name;
          symbol = res.symbol;
          decimals = res.decimals;
        }
      );

      bot.telegram.sendMessage(
        chatId,
        uniPairFound(name, symbol, mainToken, uniPair, 0, 0, calledTimes.value),
        uniPairURLs(mainToken).keyboardLayout
      );

      if (calledTimes.value >= totalPairs) alchemy.ws.off(wsData.event);
      else calledTimes.value++;
    }
  }
};

export default uniPairV2;
