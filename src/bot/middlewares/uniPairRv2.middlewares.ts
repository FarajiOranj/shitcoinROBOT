import { Telegraf } from "telegraf";
import { SessionContext } from "telegraf/typings/session";
import isCompleted from "../../helper/compeletion.checker";

const hasUniPairStat = (ctx: SessionContext<any>, next: () => void) => {
  if (ctx.session.trackSession?.commonStat === "uniPair") next();
  return;
};

const composedUniMiddleware = Telegraf.compose([
  hasUniPairStat,
  isCompleted
]);

export default composedUniMiddleware;
