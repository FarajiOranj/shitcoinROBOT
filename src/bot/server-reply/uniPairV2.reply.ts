import bot from "../bot.instance";
import { alchemy } from "../../provider/sdk-provider";
import getTokenMetadata from "../../utils/tokenMetadata";
import ITxData, {
  IWsData,
  ITrackerFn,
} from "../../../public/types/transaction";
import { uniPairFound } from "../../../public/static/trackUx";
import { uniPairURLs } from "../layout/linker";
import { Log } from "alchemy-sdk";
import * as dotenv from "dotenv";
import calculateTokenPrice from "../../utils/tokenMidPrice";
import getTokenSupply from "../../utils/tokenTotalSupply";
import calculateTokenMarketCap from "../../utils/tokenMarketCap";
import { decodeReservedTokens } from "../../utils/reservedTokens";
dotenv.config();

const { ADDLIQETH_MID, PAIR_EID, MINT_EID, WETH } = process.env;

const uniPairV2: ITrackerFn["callback"] = async (
  txData: ITxData,
  wsData: IWsData,
  chatId: number,
  totalPairs: number
): Promise<void> => {
  const input = txData.Input.input ?? "";

  if (input.includes(ADDLIQETH_MID)) {
    const { calledTimes } = wsData;

    let pairLog, mintLog: Log;
    await alchemy.core.getTransactionReceipt(txData.TxInfo.hash).then((res) => {
      pairLog = res.logs.find((log) => log.topics[0] === PAIR_EID);
      if (pairLog) mintLog = res.logs.find((log) => log.topics[0] === MINT_EID);
    });

    if (pairLog) {
      const token0Address: string = `0x${pairLog.topics[1].slice(26)}`;

      const mainToken: string = pairLog.topics[1].includes(WETH)
        ? `0x${pairLog.topics[2].slice(26)}`
        : token0Address;

      const uniPair: string = `0x${pairLog.data.slice(26, 66)}`;

      const { name, symbol, decimals } = await getTokenMetadata(mainToken);

      const reservedTokens = decodeReservedTokens(mintLog.data);

      const { priceInETH, priceInDollar, perETH, perDollar } =
        calculateTokenPrice(
          reservedTokens,
          decimals,
          mainToken === token0Address
          // etherprice
        );

      const totalSupply = await getTokenSupply(mainToken, decimals);

      const { marketCapInDollar, marketCapInETH } = calculateTokenMarketCap(
        totalSupply,
        priceInDollar,
        priceInETH
      );

      const dynamicNSoffset = name.length + symbol.length;

      await bot.telegram.sendMessage(
        chatId,
        uniPairFound(
          name,
          symbol,
          mainToken,
          uniPair,
          priceInDollar,
          priceInETH,
          marketCapInDollar,
          marketCapInETH,
          "As Soon As Possible...",
          perDollar,
          perETH,
          calledTimes.value
        ),
        {
          reply_markup: uniPairURLs(mainToken, uniPair).keyboardLayout
            .reply_markup,
          entities: [
            { type: "code", offset: 24 + dynamicNSoffset, length: 42 },
            { type: "code", offset: 84 + dynamicNSoffset, length: 42 },
          ],
        }
      );

      if (calledTimes.value >= totalPairs) {
        await wsData.transcat.off(wsData.event);
        process.exit();
      } else calledTimes.value++;
    }
  }
};

export default uniPairV2;
