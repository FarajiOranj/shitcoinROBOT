import { AlchemyEventFilter } from "alchemy-sdk";
import { alchemy, AlchemySubscription } from "./provider";
import { ITrackerFn } from "../../public/types/transaction";
import * as dotenv from "dotenv";
dotenv.config();

const pendingTxTracker = async (queryData: ITrackerFn) => {
  const event: AlchemyEventFilter = {
    method: AlchemySubscription.PENDING_TRANSACTIONS,
  };
  const { from, to, isPaired, callback } = queryData;

  isPaired
    ? Object.assign(event, {
        toAddress: to,
      })
    : Object.assign(event, {
        fromAddress: from,
      });

  let calledTimes = {
    value: 1,
  };

  const transcat = alchemy.ws.on(event, async (tx) => {
    if (isPaired && tx.from !== from) {
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

      await callback(
        {
          Input: { input },
          Route: { from, to },
          Fiscal: { value, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas },
          Sign: { nonce, v, r, s },
          TxInfo: { type, accessList, hash },
        },
        {
          transcat,
          event,
          calledTimes,
        }
      );
    }
  });
};

export default pendingTxTracker;
