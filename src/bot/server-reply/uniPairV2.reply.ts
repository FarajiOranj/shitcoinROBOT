import bot from "../bot.instance";
import { alchemy } from "../../provider/provider";
import getTokenMetadata from "../../utils/tokenMetadata";
import ITxData, {
  IWsData,
  ITrackerFn,
} from "../../../public/types/transaction";
import { uniPairFound } from "../../../public/static/trackUx";
import { uniPairURLs } from "../layout/linker";
import { Log } from "alchemy-sdk";
import * as dotenv from "dotenv";
import { SessionContext } from "telegraf/typings/session";
dotenv.config();

const { ADDLIQETH_MID, PAIR_EID, WETH } = process.env;

const uniPairV2: ITrackerFn["callback"] = async (
  txData: ITxData,
  wsData: IWsData,
  ctx: SessionContext<any>,
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

      await bot.telegram.sendMessage(
        chatId,
        uniPairFound(name, symbol, mainToken, uniPair, 0, 0, calledTimes.value),
        uniPairURLs(mainToken).keyboardLayout
      );

      if (calledTimes.value >= totalPairs) {
        await wsData.transcat.off(wsData.event);
        await delete ctx.session.underProcesses["uniNewPair"];
        // if (ctx.session.underProcesses["uniNewPair"] === null) process.exit();
      } else calledTimes.value++;
    }
  }
};

export default uniPairV2;
