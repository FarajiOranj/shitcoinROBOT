import { alchemy, AlchemySubscription } from './provider.ts';
import ITxData, {
  IPendingTrackerFn,
} from '../../public/types/transaction';

import * as dotenv from "dotenv";
dotenv.config();

const eventName: { method: AlchemySubscription; fromAddress?: string; toAddress?: string } = {
  method: AlchemySubscription.PENDING_TRANSACTIONS,
};

export async function pendingTxTracker(
  queryData: IPendingTrackerFn
) {
  const { from, to, isPaired, callback } = queryData;

  Object.assign(eventName, { toAddress: to, fromAddress: from });

  switch (isPaired) {

    case 'BothPaired': {
      if (from === undefined || to === undefined)
        throw ('pendingTxTracker: "Both" side of Route must be given!');
      break;
    }
    case 'Unpaired': {
      if (from === undefined && to === undefined)
        throw ('pendingTxTracker: A side of Route must be given!');
      break;
    }
    case 'PairedFrom': {
      if (queryData.from === undefined)
        throw ('pendingTxTracker: "From" address must be given!')
      delete eventName.toAddress;
      break;
    }
    case 'PairedTo': {
      if (queryData.to === undefined)
        throw ('pendingTxTracker: "To" address must be given!')
      delete eventName.fromAddress;
      break;
    }
    default: break;
  }

  console.log('Turning alchemy on...');
  alchemy.ws.on(
    eventName,
    async (tx) => {
      if (
        isPaired === 'BothPaired'
        &&
        (
          tx.from !== eventName.fromAddress
          ||
          tx.to !== eventName.toAddress
        )
      ) {}
      else {
        console.log('Turning off the alchemy...');
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
        console.log('Entering into the callback...');
        await callback(
          {
            Input: {
              input
            },
            Route: {
              from,
              to
            },
            Fiscal: {
              value,
              gas,
              gasPrice,
              maxFeePerGas,
              maxPriorityFeePerGas
            },
            Sign: {
              nonce,
              v,
              r,
              s
            },
            TxInfo: {
              type,
              accessList,
              hash
            },
          },
        );
        console.log("callback done.");
      }
    }
  );
}


// --------------- TESTING IN FILE!!! ---------------

const fs = require('fs');


async function createFile(TxData: ITxData, comment: string) {

  console.log('Pasting the text...')
  await fs.writeFile(
    'txHistory.js',
    `${comment}\n${JSON.stringify(TxData)}\n`,{flag: "a", encoding: "utf-8"},
    err => console.log(err)
  );

  console.log("End of file paste.");
}

 function fileCreator() {
  console.log("Sending request...");
  pendingTxTracker(
    {
      // from: whaleAddresses[0],
      to: process.env.UNI_ROUTE2,
      // isPaired: 'BothPaired',
      callback: (txData: ITxData) => createFile(txData, "// new transaction"),
    }
  );

  return console.log("Processing on server background");
}

fileCreator();


export default pendingTxTracker;