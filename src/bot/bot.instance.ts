import { Telegraf, Context } from "telegraf";
import { fork } from 'child_process';
const ms = require("millisecond");
import * as dotenv from "dotenv";
dotenv.config();


declare module "telegraf" {
    interface Context {
        ethPrice: number;
    }
}

const bot: Telegraf = new Telegraf<Context>(process.env.TELEGRAM_BOT_TOKEN, {
    handlerTimeout: ms("172000s"),
});

const ETH_PriceFork = fork("../../dist/src/child-process/forked/ethPrice.ws.js");

ETH_PriceFork.send("");

ETH_PriceFork.on("message", (price: string) => {
    console.log("bot.context.ethPrice is: ", bot.context.ethPrice)

    bot.context.ethPrice = Number(price);
});
export default bot;
