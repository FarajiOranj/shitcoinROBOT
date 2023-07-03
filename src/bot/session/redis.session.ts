import RedisSession from "telegraf-session-redis";

const session = new RedisSession({
  store: {
    host: "127.0.0.1",
    port: 6379,
  },
});

export default session;
