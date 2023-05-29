import bot from "../bot.instance";
import trackCB, { pairOptSaver, AddrAnalysis } from "../handlers/track.handlers";
import composedAddrMiddleware from "../middlewares/track.middlewares";


bot.action("track", trackCB);

bot.action(["unpaired", "bothPaied", "fromPaired", "toPaired"], pairOptSaver);

bot.hears(/^0x(.+)/, composedAddrMiddleware, AddrAnalysis);