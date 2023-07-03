import { Worker } from "worker_threads";
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

  await pairFinderWorker.on("exit", () => {
    console.log("exited successfuly");
    //it gives true
    // console.log("before change: ", ctx.session.underProcesses["uniNewPair"]);
    // ctx.session.underProcesses["uniNewPair"] = false;
    //it gives false
    // console.log("after change: ", ctx.session.underProcesses["uniNewPair"]);
    
  });
};

export default findUniV2Pairs;
