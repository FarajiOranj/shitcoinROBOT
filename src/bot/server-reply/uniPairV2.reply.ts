import bot from "../bot.instance";
import ITxData, { IWsData } from "../../../public/types/transaction";
import { ITrackerFn } from "../../../public/types/transaction";
import { alchemy } from "../../provider/provider";
import getTokenMetadata, { ITokenMetadata } from "../../utils/tokenMetadata";
// import { pendMsg } from "../../../public/static/trackUx";
import * as dotenv from "dotenv";
import { uniPairFound } from "../../../public/static/trackUx";
import { uniPairURLs } from "../layout/linker";
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
          const mainToken: string = log.topics[1].includes(WETH)
            ? `0x${log.topics[2].slice(26)}`
            : `0x${log.topics[1].slice(26)}`;

          let tokenMetadata: ITokenMetadata;
          getTokenMetadata(mainToken).then((res) => (tokenMetadata = res));

          const uniPair: string = `0x${log.data.slice(26, 66)}`;

          bot.telegram.sendMessage(
            chatId,
            uniPairFound(
              tokenMetadata.name,
              tokenMetadata.symbol,
              mainToken,
              uniPair,
              0,
              0,
              calledTimes.value
            ),
            uniPairURLs(mainToken).keyboardLayout
          );

          if (calledTimes.value >= totalPairs) {
            alchemy.ws.off(wsData.event);
          } else calledTimes.value++;
        }
      });
    });
  }
};

export default uniPairV2;
