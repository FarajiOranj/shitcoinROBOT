// import { spawn } from "child_process";
import { Worker } from "worker_threads";
import { SessionContext } from "telegraf/typings/session";
import sharedBuffer from "../../db/worker-pool/workerSharedData.db";
import * as dotenv from "dotenv";
dotenv.config();

// const findUniV2Pairs = async (
//   ctx: SessionContext<any>,
//   chatId: number,
//   totalPairs: number
// ) => {
//   const pairFinderProcess = spawn(
//     "node",
//     [
//       "dist/src/child-process/spawned/uniPairV2.thread.js",
//       chatId.toString(),
//       totalPairs.toString(),
//     ] /* {
//     detached: true,
//     stdio: "pipe"
//   } */
//   );

//   pairFinderProcess.on("exit", () => {
//     delete ctx.session.underProcesses["uniNewPair"];
//   });
// };

const findUniV2Pairs = async (
  ctx: SessionContext<any>,
  chatId: number,
  totalPairs: number
) => {
  const pairFinderWorker = new Worker(
    "./dist/src/child-process/spawned/uniPairV2.thread.js",
    {workerData: sharedBuffer}
  );

  pairFinderWorker.postMessage([chatId, totalPairs]);

  pairFinderWorker.on("exit", () => {
    delete ctx.session.underProcesses["uniNewPair"];
  });
};

export default findUniV2Pairs;
