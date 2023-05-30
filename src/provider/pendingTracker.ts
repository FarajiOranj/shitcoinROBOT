import { IPendingTrackerFn } from "../../public/types/transaction";
import { alchemy, AlchemySubscription } from "./provider";
import * as dotenv from "dotenv";
dotenv.config();

const eventName: {
  method: AlchemySubscription;
  fromAddress?: string;
  toAddress?: string;
} = { method: AlchemySubscription.PENDING_TRANSACTIONS };

const pendingTxTracker = async (queryData: IPendingTrackerFn) => {
  const { from, to, isPaired, callback } = queryData;

  Object.assign(eventName, { toAddress: to, fromAddress: from });

  alchemy.ws.on(eventName, async (tx) => {
    if (
      isPaired === "bothPaired" &&
      (tx.from !== eventName.fromAddress || tx.to !== eventName.toAddress)
    ) {
    } else {
      await alchemy.ws.off(eventName);

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

      await callback({
        Input: { input },
        Route: { from, to },
        Fiscal: { value, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas },
        Sign: { nonce, v, r, s },
        TxInfo: { type, accessList, hash },
      });
    }
  });
};

export default pendingTxTracker;