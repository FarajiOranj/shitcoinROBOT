import { workerData, parentPort } from "worker_threads";
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
import calculateTokenPrice from "../../utils/tokenMidPrice";
import getTokenSupply from "../../utils/tokenTotalSupply";
import calculateTokenMarketCap from "../../utils/tokenMarketCap";
import { decodeReservedTokens } from "../../utils/reservedTokens";
import * as dotenv from "dotenv";
import { calculateShitcoinLiquidity } from "../../utils/pairLiquidity";
dotenv.config();

const { ADDLIQETH_MID, PAIR_EID, MINT_EID, WETH } = process.env;
const sharedData = new Float32Array(workerData);

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

      const etherprice = sharedData[0];

      console.log(etherprice);

      const { priceInETH, priceInDollar, perETH, perDollar, injectedSupply } =
        calculateTokenPrice(
          reservedTokens,
          decimals,
          etherprice,
          mainToken === token0Address,
        );

      const totalSupply = await getTokenSupply(mainToken, decimals);

      const { marketCapInDollar, marketCapInETH } = calculateTokenMarketCap(
        totalSupply,
        priceInDollar,
        priceInETH
      );

      const { liquidityInDollar, liquidityInETH } = calculateShitcoinLiquidity(
        injectedSupply,
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
          marketCapInDollar,
          marketCapInETH,
          liquidityInDollar,
          liquidityInETH,
          priceInDollar,
          priceInETH,
          totalSupply,
          injectedSupply,
          perDollar,
          perETH,
          etherprice,
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
        // process.exit();
        parentPort.postMessage("close");
      } else calledTimes.value++;
    }
  }
};

export default uniPairV2;
