import { spawn } from "child_process";
import { SessionContext } from "telegraf/typings/session";
import * as dotenv from "dotenv";
dotenv.config();

const findUniV2Pairs = async (
  ctx: SessionContext<any>,
  chatId: number,
  totalPairs: number
) => {
  const pairFinderProcess = spawn(
    "node",
    [
      "dist/src/child-process/uniPairV2.thread.js",
      chatId.toString(),
      totalPairs.toString(),
    ] /* {
    detached: true,
    stdio: "pipe"
  } */
  );

  pairFinderProcess.on("close", () => {
    delete ctx.session.underProcesses["uniNewPair"];
  });
};

export default findUniV2Pairs;
