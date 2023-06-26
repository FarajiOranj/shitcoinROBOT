import { Telegraf, Context } from "telegraf";
const ms = require("millisecond");
import * as dotenv from "dotenv";
dotenv.config();

declare module "telegraf" {
  interface Context {
    ethPrice: { value: number };
  }
}

const bot = new Telegraf<Context>(process.env.TELEGRAM_BOT_TOKEN, {
  handlerTimeout: ms("172000s"),
});

bot.context.ethPrice = {value : 0};

export default bot;
