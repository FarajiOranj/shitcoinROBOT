import { SessionContext } from "telegraf/typings/session";

const deleteAvailableMsg = async (ctx: SessionContext<any>) => {
  try {
    await ctx.deleteMessage(ctx.session.keyId);
  } catch {}

  if (ctx.session?.trackSession?.commonStat)
    ctx.session.trackSession.commonStat = null;
};

export default deleteAvailableMsg;
