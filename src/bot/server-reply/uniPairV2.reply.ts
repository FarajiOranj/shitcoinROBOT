import bot from "../bot.instance";
import ITxData, { IWsData } from "../../../public/types/transaction";
import { ITrackerFn } from "../../../public/types/transaction";
import { alchemy } from "../../provider/provider";
import getTokenMetadata, { ITokenMetadata } from "../../utils/tokenMetadata";
// import { pendMsg } from "../../../public/static/trackUx";
import * as dotenv from "dotenv";
import { uniPairFound } from "../../../public/static/trackUx";
import { uniPairURLs } from "../layout/linker";
import { Log } from "alchemy-sdk";
dotenv.config();

const { ADDLIQETH_MID, PAIR_EID, WETH } = process.env;

const uniPairV2: ITrackerFn["callback"] = async (
  txData: ITxData,
  wsData: IWsData,
  chatId: number,
  totalPairs: number
): Promise<void> => {
  const input = txData.Input.input ?? "";

  if (input.includes(ADDLIQETH_MID)) {
    const { calledTimes } = wsData;

    let log: Log;
    await alchemy.core.getTransactionReceipt(txData.TxInfo.hash).then((res) => {
      log = res.logs.find((log) => log.topics[0] === PAIR_EID);
    });

    if (log) {
      const mainToken: string = log.topics[1].includes(WETH)
        ? `0x${log.topics[2].slice(26)}`
        : `0x${log.topics[1].slice(26)}`;

      const uniPair: string = `0x${log.data.slice(26, 66)}`;

      const { name, symbol, decimals } = await getTokenMetadata(mainToken);

      bot.telegram.sendMessage(
        chatId,
        uniPairFound(name, symbol, mainToken, uniPair, 0, 0, calledTimes.value),
        uniPairURLs(mainToken).keyboardLayout
      );

      calledTimes.value >= totalPairs
        ? await alchemy.ws.off(wsData.event)
        : calledTimes.value++;
    }
  }
};

export default uniPairV2;
