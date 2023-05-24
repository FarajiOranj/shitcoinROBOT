import { MiddlewareFn } from "telegraf";
import bot from "../bot.instance";
import { menuCB } from "../handlers/common.handlers";

const backward = bot.action("start", menuCB);
const starter = bot.start(menuCB);
// bot.help();

export { starter, backward };