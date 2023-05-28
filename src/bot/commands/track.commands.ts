import { Composer } from "telegraf";
import bot from "../bot.instance";
import trackCB, { pairOptSaver } from "../handlers/track.handlers";

bot.action("track", trackCB);

bot.action(["unpaired", "bothPaied", "fromPaired", "toPaired"], pairOptSaver);

