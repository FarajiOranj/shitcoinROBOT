import { Worker } from "worker_threads";
import { Telegraf } from "telegraf";
import bot from "./src/bot/bot.instance";

class Application {
  constructor(bot: Telegraf) {
    (async () => {
      await this.registerRedisSession();
      await this.ethPriceWorker();
      await this.registerBotMiddlewares();
      await this.registerBotCommands();
      await this.launchBot(bot);
    })();
  }

  async registerRedisSession() {
    require("./src/session/redis.session");
  }

  async ethPriceWorker() {
    new Worker("./dist/src/workers/ethPrice.worker.js", {
      workerData: require("./src/db/worker-pool/workerSharedData.db"),
    });
  }

  async registerBotMiddlewares() {
    require("./src/bot/middlewares/common.middlewares");
  }

  async registerBotCommands() {
    require("./src/bot/commands/common.commands");
    require("./src/bot/commands/track.commands");
    require("./src/bot/commands/uniPairRv2.commands");
  }

  async launchBot(bot: Telegraf) {
    bot.launch();
  }
}

new Application(bot);
