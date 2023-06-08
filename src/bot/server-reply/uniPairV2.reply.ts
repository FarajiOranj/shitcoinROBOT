import bot from "../bot.instance";
import ITxData from "../../../public/types/transaction";
import { ITrackerFn } from "../../../public/types/transaction";
import getPairAddress from "../../helper/pairGetter";
// import { pendMsg } from "../../../public/static/trackUx";

const uniPairV2: ITrackerFn["callback"] = (
  txData: ITxData,
  calledTimes: { value: number },
  chatId: number,
  totalPairs: number
): boolean => {
  const input = txData.Input.input ?? "";

  if (input.includes("0xf305d719")) {
    const pairAddr: string = getPairAddress(txData.TxInfo.hash);
    bot.telegram.sendMessage(chatId, pairAddr);

    if (pairAddr) {


      if (totalPairs >= calledTimes.value) return true;
      else {
        calledTimes.value++;
        return false;
      }
    } else return false;
  } else return false;

};

export { uniPairV2 };
