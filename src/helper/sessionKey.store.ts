import { SessionContext } from "telegraf/typings/session";

const storeKeyID = (ctx: SessionContext<any>, msgId: number): void => {
  if (!ctx.session?.keyId) ctx.session.keyId = {} as number;
  ctx.session.keyId = msgId;

  console.log(ctx.session.keyId);
};

export default storeKeyID;
