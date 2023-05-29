import { Context } from "telegraf";

const deleteAvailableMsg = (ctx: Context) => {
    try {
        ctx.deleteMessage()
    } catch {}
};

export default deleteAvailableMsg;
