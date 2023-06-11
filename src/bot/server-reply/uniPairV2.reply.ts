import bot from "../bot.instance";
import ITxData, { IWsData } from "../../../public/types/transaction";
import { ITrackerFn } from "../../../public/types/transaction";
import { alchemy } from "../../provider/provider";
// import { pendMsg } from "../../../public/static/trackUx";
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

    alchemy.core.getTransactionReceipt(txData.TxInfo.hash).then((res) => {
      res.logs.map((log) => {
        if (log.topics[0] === PAIR_EID) {
          console.log(txData.TxInfo.hash);
          const mainToken: string = log.topics[1].includes(WETH)
            ? log.topics[2]
            : log.topics[1];

          bot.telegram.sendMessage(chatId, `0x${mainToken.slice(26)}`);
          if (calledTimes.value >= totalPairs) {
            alchemy.ws.off(wsData.event);
          } else calledTimes.value++;
        }
      });
    });
  }
};

export default uniPairV2;
