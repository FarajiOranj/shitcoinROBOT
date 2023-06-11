import { AlchemyEventFilter } from "alchemy-sdk";
import { alchemy, AlchemySubscription } from "./provider";
import { ITrackerFn } from "../../public/types/transaction";
import * as dotenv from "dotenv";
dotenv.config();

const minedTxTracker = async (queryData: ITrackerFn) => {
  const event: AlchemyEventFilter = {
    method: AlchemySubscription.MINED_TRANSACTIONS,
  };
  const { /* from, */ to, /* isPaired, */ callback } = queryData;

  let calledTimes = {
    value: 1,
  };

  Object.assign(event, {
    addresses: [
      {
        to,
      },
    ],
  });

  alchemy.ws.on(event, async (tx) => {
    const {
      input,
      from,
      to,
      value,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      v,
      r,
      s,
      type,
      accessList,
      hash,
      blockHash,
      blockNumber,
    } = tx.transaction;

    await callback(
      {
        Input: { input },
        Route: { from, to },
        Fiscal: { value, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas },
        Sign: { nonce, v, r, s },
        TxInfo: { type, accessList, hash },
        BlockInfo: { blockHash, blockNumber },
      },
      {
        calledTimes,
        event,
      }
    );
  });
};

// ---------test-------

// minedTxTracker({
//   to: UNI_ROUTE2,
//   callback: (txData: ITxData, calledTimes?: { value: number }) =>
//     uniPairV2(txData, calledTimes, 2),
// });

// const uniPairV2: ITrackerFn["callback"] = (
//   txData: ITxData,
//   calledTimes: { value: number },
//   // chatId: number,
//   totalPairs: number
// ) => {
//   const input = txData.Input.input ?? "";

//   console.log(calledTimes.value)

//   if (input.includes(ADDLIQETH_MID)) {
//     alchemy.core.getTransactionReceipt(txData.TxInfo.hash).then((res) => {
//       res.logs.map((log) => {
//         if (log.topics[0] === PAIR_EID) {
//           console.log(txData.TxInfo.hash);
//           const mainToken: string = log.topics[1].includes(WETH)
//             ? log.topics[2]
//             : log.topics[1];

//             console.log(mainToken);
//           // bot.telegram.sendMessage(chatId, mainToken);
//           if (calledTimes.value >= totalPairs) {
//             // return true;
//             alchemy.ws.off(event);
//           } else {
//             calledTimes.value++;
//             // return false;
//           }
//         }
//       });
//     });
//   } /* else return false; */
// };

export default minedTxTracker;
