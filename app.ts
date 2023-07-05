import { Worker } from "worker_threads";
import { Telegraf } from "telegraf";
import bot from "./src/bot/bot.instance";

class Application {
  constructor(bot: Telegraf) {
    this.registerRedisSession();
    this.ethPriceWorker();
    this.registerBotMiddlewares();
    this.registerBotCommands();
    this.launchBot(bot);
  }

  registerRedisSession() {
    require("./src/session/redisClient");
  }

  ethPriceWorker() {
    new Worker("./dist/src/workers/ethPrice.worker.js", {
      workerData: require("./src/db/worker-pool/workerSharedData.db"),
    });
  }

  registerBotMiddlewares() {
    require("./src/bot/middlewares/common.middlewares");
  }

  registerBotCommands() {
    require("./src/bot/commands/common.commands");
    // require("./src/bot/commands/track.commands");
    require("./src/bot/commands/uniPairRv2.commands");
  }

  launchBot(bot: Telegraf) {
    bot.launch();
  }
}

new Application(bot);
