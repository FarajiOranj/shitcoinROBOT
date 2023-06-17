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
    "npx",
    [
      "ts-node",
      "../../cluster-thread/uniPairV2.thread.ts",
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
