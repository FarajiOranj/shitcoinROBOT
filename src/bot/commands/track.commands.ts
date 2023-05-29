import { Composer } from "telegraf";
import bot from "../bot.instance";
import trackCB, { pairOptSaver, AddrAnalysis } from "../handlers/track.handlers";
import Web3 from "web3";
import composedAddrMiddleware from "../middlewares/track.middlewares";


bot.action("track", trackCB);

bot.action(["unpaired", "bothPaied", "fromPaired", "toPaired"], pairOptSaver);

bot.hears(/^0x(.+)/, composedAddrMiddleware, AddrAnalysis);