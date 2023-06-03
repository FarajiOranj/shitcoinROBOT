import bot from "../bot.instance";
import composedAddrMiddleware from "../middlewares/track.middlewares";
import trackCB, {
  pairOptSaver,
  AddrAnalysis,
} from "../handlers/track.handlers";

bot.action("track", trackCB);

bot.action(["bothPaired", "fromPaired"], pairOptSaver);

bot.hears(/^0x(.+)/, composedAddrMiddleware, AddrAnalysis);
