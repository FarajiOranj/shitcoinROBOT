import { ITrackerFn } from "../../public/types/transaction";
import { alchemy, AlchemySubscription } from "./provider";
import * as dotenv from "dotenv";
dotenv.config();

const eventName: {
  method: AlchemySubscription;
  fromAddress?: string;
  toAddress?: string;
} = { method: AlchemySubscription.PENDING_TRANSACTIONS };

const pendingTxTracker = async (queryData: ITrackerFn) => {
  const { from, to, isPaired, callback } = queryData;

  isPaired
    ? Object.assign(eventName, {
        toAddress: to,
      })
    : Object.assign(eventName, {
        fromAddress: from,
      });

  let calledTimes: {value : number};

  alchemy.ws.on(eventName, async (tx) => {
    
    if (isPaired && tx.from !== from) {
      console.log(tx);
      return;
    } else {
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
      } = tx;

      const shouldOff: boolean = await callback(
        {
          Input: { input },
          Route: { from, to },
          Fiscal: { value, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas },
          Sign: { nonce, v, r, s },
          TxInfo: { type, accessList, hash },
        },
        calledTimes
      );

      if (shouldOff) await alchemy.ws.off(eventName);
    }
  });
};

export default pendingTxTracker;
