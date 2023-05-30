import { Context } from "telegraf";
import { SessionContext } from "telegraf/typings/session";

const deleteAvailableMsg = (ctx: SessionContext<any>) => {
    try {
        ctx.deleteMessage(ctx.session.keyId);
    } catch {}
};

export default deleteAvailableMsg;
