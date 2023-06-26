import { spawn } from "child_process";
import bot from "./src/bot/bot.instance";
import "./src/bot/session/default.session";
import "./src/bot/middlewares/common.middlewares";
import "./src/bot/commands/common.commands";
import "./src/bot/commands/track.commands";
import "./src/bot/commands/uniPairRv2.commands";

const ETH_PriceFork = spawn("node", [
  "dist/src/child-process/spawned/ethPrice.ws.js",
]);

ETH_PriceFork.stdout.on("data", (data) => {
    console.log(data);
    console.log(data.toString());
  console.log("bot.context.ethPrice is: ", bot.context.ethPrice);
  bot.context.ethPrice = Number(data.toString().trim());
});

bot.launch();
