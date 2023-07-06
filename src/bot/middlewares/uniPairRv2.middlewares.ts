import { Telegraf } from "telegraf";
import { SessionContext } from "telegraf/typings/session";
import isCompleted from "../../helper/checker/completion.checker";
import { singleGetter } from "../../session/getter";

const hasUniPairStat = async (ctx: SessionContext<any>, next: () => void) => {
  const status = await singleGetter(ctx, "tracker")["commonStat"];

  console.log("In UniPair Stat Middleware status is: ", status);

  if (status === "uniPair") {
    console.log("Passed UniPair Stat.");
    return next();
  } else {
    console.log("Cant Pass UniPair Stat!");
    return;
  }
};

const composedUniMiddleware = Telegraf.compose([hasUniPairStat, isCompleted]);

export default composedUniMiddleware;
