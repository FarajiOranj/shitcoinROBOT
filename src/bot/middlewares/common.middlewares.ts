import bot from "../bot.instance";
import registeredUserIDS from "../../db/registeredUsers.db";
import { Context } from "telegraf";


bot.use((ctx: Context, next: () => Promise<void> ) =>{
    if(!registeredUserIDS.has(ctx.chat.id))
        return ctx.reply("شما احراز نشده اید")
    return next();
});