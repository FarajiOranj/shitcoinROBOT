import { SessionContext } from "telegraf/typings/session";
import { singleGetter } from "../../session/getter";
import { singleSetter } from "../../session/setter";

const deleteAvailableMsg = async (ctx: SessionContext<any>) => {
  const keyId = await singleGetter(ctx, "keyId");

  if (keyId !== null) {
    try {
      await ctx.deleteMessage(+keyId);
    } catch {}

    let tracker = await singleGetter(ctx, "tracker");
    tracker["commonStat"] = null;

    singleSetter(ctx, "tracker", tracker);
  }
};

export default deleteAvailableMsg;
