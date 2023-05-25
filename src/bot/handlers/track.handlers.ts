import { Context } from "telegraf";
import bot from "../bot.instance";
import { trackMenu } from "../layout/layout";
import { trackOpts } from "../../../public/static/trackUx";

const trackCB = (ctx: Context) => {
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, trackOpts, trackMenu);
};

export default trackCB;