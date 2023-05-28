import { Composer } from "telegraf";
import bot from "../bot.instance";
import trackCB, { pairOptSaver, AddrAnalysis } from "../handlers/track.handlers";
import Web3 from "web3";


bot.action("track", trackCB);

bot.action(["unpaired", "bothPaied", "fromPaired", "toPaired"], pairOptSaver);

// type AddrRegExp = RegExp;
// const evmAddrRegex: RegExp = /^(0x)?[0-9a-fA-F]{40}$/i;

// function validateUserAddress(address: string): boolean {
//     return evmAddrRegex.test(address);
// } 

bot.hears(/^0x(.+)/, AddrAnalysis);