import { SessionContext } from "telegraf/typings/session";

const storeKeyID =
  (ctx: SessionContext<any>) :void => {
    if (!ctx.session?.keyId) ctx.session.keyId = {} as number;
    ctx.session.keyId = ctx.message["message_id"];
  };

export default storeKeyID;
