import { Telegraf, Context } from "telegraf";
// import { Context } from 'telegraf/typings';
const ms = require("millisecond");
import * as dotenv from "dotenv";
dotenv.config();

declare module 'telegraf' {
    interface Context {
        ethPrice: number;
    }
  }

const bot: Telegraf = new Telegraf<Context>(process.env.TELEGRAM_BOT_TOKEN, {
    handlerTimeout: ms('172000s'),
});


export default bot;
