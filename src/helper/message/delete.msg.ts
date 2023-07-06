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

    let updatedTracker = await singleGetter(ctx, "tracker");
    console.log(updatedTracker);
    updatedTracker["commonStat"] = null;
    updatedTracker["completed"] = false;

    singleSetter(ctx, "tracker", updatedTracker);
  }
};

export default deleteAvailableMsg;
