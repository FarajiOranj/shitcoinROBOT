import bot from "../bot.instance";
import session from "../session/redis.session";

bot.use(session);