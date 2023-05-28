import { Telegraf, session } from 'telegraf';
import * as dotenv from "dotenv";
dotenv.config();

const bot: Telegraf = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

export default bot;