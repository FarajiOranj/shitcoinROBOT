import ITxData, {
  ITrackerFn /* , Route */,
} from "../../public/types/transaction";
import { alchemy, AlchemySubscription } from "./provider";
import * as dotenv from "dotenv";
dotenv.config();

const { UNI_ROUTE2, ADDLIQETH_MID, PAIR_EID, WETH } = process.env;

// interface RouteObj {
//   from?: string;
//   to?: string;
// }

const eventName: {
  method: AlchemySubscription;
  //   addresses?: Array<RouteObj>,
} = { method: AlchemySubscription.MINED_TRANSACTIONS };

const minedTxTracker = async (queryData: ITrackerFn) => {
  const { /* from, */ to, /* isPaired, */ callback } = queryData;

  let shouldOff: boolean;

  let calledTimes = {
    value: 1,
  };

  Object.assign(eventName, {
    addresses: [
      {
        to,
      },
    ],
  });

  alchemy.ws.on(eventName, async (tx) => {
    if (shouldOff) await alchemy.ws.off(eventName);

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

    shouldOff = await callback(
      {
        Input: { input },
        Route: { from, to },
        Fiscal: { value, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas },
        Sign: { nonce, v, r, s },
        TxInfo: { type, accessList, hash },
        BlockInfo: { blockHash, blockNumber },
      },
      calledTimes
    );
  });
};

// ---------test-------

minedTxTracker({
  to: UNI_ROUTE2,
  callback: (txData: ITxData, calledTimes?: { value: number }): boolean =>
    logCreatedPair(txData, calledTimes),
});

const logCreatedPair = (
  txData: ITxData,
  calledTimes: { value: number }
): boolean => {
  const input = txData.Input.input ?? "";

  let shouldOff: boolean;

  if (input.includes(ADDLIQETH_MID)) {
    alchemy.core.getTransactionReceipt(txData.TxInfo.hash).then((res) => {
      res.logs.map((log) => {
        if (log.topics[0] === PAIR_EID) {
          console.log(txData.TxInfo.hash);
          if (log.topics[1] === WETH) console.log(log.topics[2]);
          else console.log(log.topics[1]);

          if (calledTimes.value === 3) {
            shouldOff = true;
          } else calledTimes.value++;
        }
      });
    });
  }

  return shouldOff;
};

export default minedTxTracker;
