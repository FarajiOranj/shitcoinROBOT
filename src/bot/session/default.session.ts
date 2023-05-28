import bot from '../bot.instance';
import { session } from 'telegraf';


bot.use(session());