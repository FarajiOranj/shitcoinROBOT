import { MiddlewareFn } from "telegraf";
import bot from "../bot.instance";
import { menuCB } from "../handlers/common.handlers";

bot.action("start", menuCB);
bot.start(menuCB);
// bot.help();

// export { starter, backward };