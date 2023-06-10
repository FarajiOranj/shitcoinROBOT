import bot from "../bot.instance";
import ITxData from "../../../public/types/transaction";
import { ITrackerFn } from "../../../public/types/transaction";
import { alchemy } from "../../provider/provider";
// import getPairAddress from "../../helper/pairGetter";
// import { pendMsg } from "../../../public/static/trackUx";
import * as dotenv from "dotenv";
dotenv.config();

const { ADDLIQETH_MID, PAIR_EID, WETH } = process.env;

const uniPairV2: ITrackerFn["callback"] = (
  txData: ITxData,
  calledTimes: { value: number },
  chatId: number,
  totalPairs: number
): boolean => {
  const input = txData.Input.input ?? "";
  let shouldOff: boolean;

  if (input.includes(ADDLIQETH_MID)) {
    alchemy.core.getTransactionReceipt(txData.TxInfo.hash).then((res) => {
      res.logs.map((log) => {
        if (log.topics[0] === PAIR_EID) {
          console.log(txData.TxInfo.hash);
          const mainToken: string = log.topics[1].includes(WETH)
            ? log.topics[2]
            : log.topics[1];

          bot.telegram.sendMessage(chatId, mainToken);
          if (calledTimes.value >= totalPairs) {
            shouldOff = true;
          } else calledTimes.value++;
        }
      });
    });
  }

  return shouldOff;
};

export default uniPairV2;
