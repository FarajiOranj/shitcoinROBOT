import { Worker } from "worker_threads";
import { SessionContext } from "telegraf/typings/session";
import sharedBuffer from "../../db/worker-pool/workerSharedData.db";
import * as dotenv from "dotenv";
import { singleGetter } from "../../session/getter";
import { singleSetter } from "../../session/setter";
dotenv.config();

const underProcesses = "underProcesses";

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

  pairFinderWorker.on("exit", () => {
    singleGetter(ctx, underProcesses).then((value) => {
      const updatedValue = value;
      updatedValue["uniNewPair"] = null;
      singleSetter(ctx, underProcesses, updatedValue);
    });
  });
};

export default findUniV2Pairs;
