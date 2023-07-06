import { Telegraf } from "telegraf";
import { SessionContext } from "telegraf/typings/session";
import isCompleted from "../../helper/checker/completion.checker";
import { singleGetter } from "../../session/getter";

const hasUniPairStat = async (ctx: SessionContext<any>, next: () => void) => {
  if ((await singleGetter(ctx, "tracker")["commonStat"]) === "uniPair") {
    console.log("Passed UniPair Stat.");
    return next();
  } else {
    console.log("Cant Pass UniPair Stat!");
    return;
  }
};

const composedUniMiddleware = Telegraf.compose([hasUniPairStat, isCompleted]);

export default composedUniMiddleware;
