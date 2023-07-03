import RedisSession from "telegraf-session-redis";
import bot from "../bot.instance";

const session = new RedisSession({
  store: {
    host: "127.0.0.1",
    port: 6379,
  },
});

bot.use(session);
