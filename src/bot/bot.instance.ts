import { Telegraf, Context } from "telegraf";
const ms = require("millisecond");
import * as dotenv from "dotenv";
dotenv.config();

const bot : Telegraf= new Telegraf<Context>(process.env.TELEGRAM_BOT_TOKEN, {
  handlerTimeout: ms("172000s"),
});

export default bot;
