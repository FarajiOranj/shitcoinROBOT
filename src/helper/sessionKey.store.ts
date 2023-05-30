import { Message } from "telegraf/typings/core/types/typegram";
import { SessionContext } from "telegraf/typings/session";

const storeKeyID = (ctx: SessionContext<any>) => (message: Message) :void => {
    if(!ctx.session?.keyId) ctx.session.keyId = {} as number;
    ctx.session.keyId = message.message_id;
}

export default storeKeyID;