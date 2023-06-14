import { SessionContext } from "telegraf/typings/session";

const isCompleted = (ctx: SessionContext<any>, next: () => void) => {
  if (!ctx.session.trackSession.completed) next();
  return;
};

export default isCompleted;
