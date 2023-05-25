import bot from "../bot.instance";
import trackCB from "../handlers/track.handlers";

bot.hears("track", trackCB);
