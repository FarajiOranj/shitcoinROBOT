import { SessionContext } from "telegraf/typings/session";

const isCompleted = (ctx: SessionContext<any>, next: () => void) => {
  if (!ctx.session.trackSession.completed) return next();
  return;
};

export default isCompleted;
