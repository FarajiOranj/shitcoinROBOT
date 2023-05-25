import bot from "../bot.instance";
import { menuCB } from "../handlers/common.handlers";

bot.start(menuCB);
bot.action("start", menuCB);