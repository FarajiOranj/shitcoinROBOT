import { SessionContext } from "telegraf/typings/session";
import deleteAvailableMsg from "./deleteMsg";
import storeKeyID from "./sessionKey.store";
import { backToMenu } from "../bot/layout/layout";

const isUnderProcess = (ctx: SessionContext<any>, next: () => void) => {
  if (ctx.session.underProcesses[`${ctx.callbackQuery["data"]}`]) {
    deleteAvailableMsg(ctx);
    return ctx.reply("⛔️ تا دریافت کامل نتیجه درخواست داده شده پیشین، این گزینه غیرقابل استفاده میباشد.", backToMenu).then(storeKeyID(ctx));
  } else return next();
};

export default isUnderProcess;
