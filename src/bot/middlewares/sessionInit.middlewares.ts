import { session } from "telegraf";
import bot from "../bot.instance";
import store from "../session/redis.session";


bot.use(session({store}));