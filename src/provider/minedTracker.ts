import { ITrackerFn, Route } from "../../public/types/transaction";
import { alchemy, AlchemySubscription } from "./provider";
import * as dotenv from "dotenv";
dotenv.config();

interface RouteObj {
  from?: string;
  to?: string;
}

const eventName: {
  method: AlchemySubscription;
  //   addresses?: Array<RouteObj>,
} = { method: AlchemySubscription.MINED_TRANSACTIONS };

const minedTxTracker = async (queryData: ITrackerFn) => {
  const { /* from, */ to/* , isPaired */, callback } = queryData;

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
    } = tx;

    const shouldOff: boolean = await callback(
      {
        Input: { input },
        Route: { from, to },
        Fiscal: { value, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas },
        Sign: { nonce, v, r, s },
        TxInfo: { type, accessList, hash },
        BlockInfo: { blockHash, blockNumber }
      },
      calledTimes
    );

    if (shouldOff) await alchemy.ws.off(eventName);
  });
};

export default minedTxTracker;
