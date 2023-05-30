import { Context } from "telegraf";
import bot from "../bot.instance";
import registeredUserIDS from "../../db/registeredUsers.db";
import { notAuthenticated } from "../../../public/static/starterUserUx";

bot.use((ctx: Context, next: () => Promise<void>) => {
  if (!registeredUserIDS.has(ctx.chat.id)) return ctx.reply(notAuthenticated);
  return next();
});
