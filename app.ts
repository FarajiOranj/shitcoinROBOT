
import { fork } from "child_process";
import bot from './src/bot/bot.instance';
import './src/bot/session/default.session'
import './src/bot/middlewares/common.middlewares';
import './src/bot/commands/common.commands';
import './src/bot/commands/track.commands';
import './src/bot/commands/uniPairRv2.commands';

const ETH_PriceFork = fork("dist/src/child-process/forked/ethPrice.ws.js");
  
  ETH_PriceFork.send("");
  
  ETH_PriceFork.on("message", (price: string) => {
    console.log("bot.context.ethPrice is: ", bot.context.ethPrice);
  
    bot.context.ethPrice = Number(price);
  });

bot.launch();
