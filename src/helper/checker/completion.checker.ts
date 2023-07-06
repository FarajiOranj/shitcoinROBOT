import { SessionContext } from "telegraf/typings/session";
import { singleGetter } from "../../session/getter";

const isCompleted = async (ctx: SessionContext<any>, next: () => void) => {
  const tracker = await singleGetter(ctx, "tracker");

  console.log("In Completion Stat Middleware status is: ", tracker["completed"]);

  if (!tracker["completed"]) {
    console.log("Passed All UniPair Middlewares.");
    return next();
  } else {
    console.log("Cant Pass Completion Stat!");
    return;
  }
};

export default isCompleted;
