import bot from "../bot.instance";
import trackCB from "../handlers/track.handlers";

bot.action("track", trackCB);
