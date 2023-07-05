import { SessionContext } from "telegraf/typings/session";
import { singleGetter } from "../../session/getter";

const isCompleted = async (ctx: SessionContext<any>, next: () => void) => {
  const completion = await singleGetter(ctx, "tracker")["completed"];

  if (!completion) return next();
  return;
};

export default isCompleted;
