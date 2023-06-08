import { SessionContext } from "telegraf/typings/session";

const hasUniPairStat = (ctx: SessionContext<any>, next: () => void) => {
  if (ctx.session?.commonStat === "uniPair") next();
  return;
};

export { hasUniPairStat };
