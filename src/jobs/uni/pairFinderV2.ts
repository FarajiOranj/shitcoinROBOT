import { spawn } from "child_process";
import { SessionContext } from "telegraf/typings/session";
import * as dotenv from "dotenv";
dotenv.config();

const findUniV2Pairs = async (
  ctx: SessionContext<any>,
  chatId: number,
  totalPairs: number
) => {
  const childProcess = spawn(
    "node",
    [
      "dist/cluster-thread/uniPairV2.thread.js",
      JSON.stringify(ctx),
      chatId.toString(),
      totalPairs.toString(),
    ] /* {
    detached: true,
    stdio: "pipe"
  } */
  );
};

export default findUniV2Pairs;
