import { Worker } from "worker_threads";
import session from "../../bot/session/redis.session";
import { SessionContext } from "telegraf/typings/session";
import sharedBuffer from "../../db/worker-pool/workerSharedData.db";
import * as dotenv from "dotenv";
dotenv.config();

const findUniV2Pairs = async (
  ctx: SessionContext<any>,
  chatId: number,
  totalPairs: number
) => {
  const pairFinderWorker = new Worker(
    "./dist/src/workers/uniPairV2.worker.js",
    { workerData: sharedBuffer }
  );

  await pairFinderWorker.postMessage([chatId, totalPairs]);

  new Promise(() => {
    pairFinderWorker.on("exit", () => {});
  }).then(() => {
    delete ctx.session.underProcesses["uniNewPair"];
  });
};

export default findUniV2Pairs;
