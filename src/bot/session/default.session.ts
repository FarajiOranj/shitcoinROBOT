import RedisSession from "telegraf-session-redis";
import bot from "../bot.instance";

const session = new RedisSession({
  store: {
    host: "79.175.66.159",
    port: 6379,
  },
});

bot.use(session);
