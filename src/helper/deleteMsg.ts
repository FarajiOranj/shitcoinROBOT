import { SessionContext } from "telegraf/typings/session";

const deleteAvailableMsg = (ctx: SessionContext<any>) => {
  try {
    ctx.deleteMessage(ctx.session.keyId);
  } catch {}

  if(ctx.session?.trackSession?.commonStat) {
    ctx.session.trackSession.commonStat = null;
  }
};

export default deleteAvailableMsg;
