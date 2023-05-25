import bot from './src/bot/bot.instance';
import './src/bot/middlewares/common.middlewares';
import './src/bot/commands/common.commands';
import './src/bot/commands/track.commands';


bot.launch();