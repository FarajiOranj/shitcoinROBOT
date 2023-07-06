import { SessionContext } from "telegraf/typings/session";
import { singleGetter } from "../../session/getter";
import { singleSetter } from "../../session/setter";

const deleteAvailableMsg = async (ctx: SessionContext<any>) => {
  const msgId = await singleGetter(ctx, "msgId");

  console.log(msgId);

  if (msgId !== null) {
    try {
      await ctx.deleteMessage(+msgId);
    } catch {}

    let tracker = await singleGetter(ctx, "tracker");
    console.log(tracker)
    tracker["commonStat"] = null;

    singleSetter(ctx, "tracker", tracker);
  }
};

export default deleteAvailableMsg;
