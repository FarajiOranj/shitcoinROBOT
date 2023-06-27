import { Worker } from "worker_threads";
import sharedBuffer from "./src/db/worker-pool/workerSharedData.db";
import bot from "./src/bot/bot.instance";
import "./src/bot/session/default.session";
import "./src/bot/middlewares/common.middlewares";
import "./src/bot/commands/common.commands";
import "./src/bot/commands/track.commands";
import "./src/bot/commands/uniPairRv2.commands";

// const sharedData = new Float32Array(sharedBuffer);

/* const ethPriceWorker =  */ new Worker(
  "./dist/src/workers/ethPrice.worker.js",
  {
    workerData: sharedBuffer,
  }
);

// ethPriceWorker.on("message", (message) => {
//   console.log("ethPrice worker message: ", message);
//   console.log("sharedData: ", sharedData[0]);
// });

bot.launch();
