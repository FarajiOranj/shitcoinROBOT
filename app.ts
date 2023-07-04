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
    await require("./src/session/redis.session");
  }

  async ethPriceWorker() {
    await new Worker("./dist/src/workers/ethPrice.worker.js", {
      workerData: require("./src/db/worker-pool/workerSharedData.db"),
    });
  }

  async registerBotMiddlewares() {
    await require("./src/bot/middlewares/common.middlewares");
  }

  async registerBotCommands() {
    await require("./src/bot/commands/common.commands");
    await require("./src/bot/commands/track.commands");
    await require("./src/bot/commands/uniPairRv2.commands");
  }

  async launchBot(bot: Telegraf) {
    await bot.launch();
  }
}

new Application(bot);
