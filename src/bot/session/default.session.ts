// import { session } from "telegraf";
import RedisSession from 'telegraf-session-redis';
// import Redis from 'ioredis';
import bot from "../bot.instance";


// const redisClient = new Redis({
//     host: 'localhost',
//     port: 6379,
//   });
  

  const session = new RedisSession({
    store: {
      host: 'localhost',
      port: 6379,
    },

  });
  
  bot.use(session);