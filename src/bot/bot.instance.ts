import { Telegraf } from 'telegraf';

// import dotenv from 'dotenv';
// dotenv.config();


const bot: Telegraf = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);


export default bot;