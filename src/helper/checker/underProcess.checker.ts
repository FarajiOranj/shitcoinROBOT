import { SessionContext } from "telegraf/typings/session";
import deleteAvailableMsg from "../message/delete.msg";
import storeKeyID from "../message/storeId.msg";
import { backToMenu } from "../../bot/layout/layout";
import { singleGetter } from "../../session/getter";

const isUnderProcess = async (ctx: SessionContext<any>, next: () => void) => {
  const underProcessStat = await singleGetter(ctx, "underProcesses")[`${ctx.callbackQuery["data"]}`]
  console.log(underProcessStat);
  if (underProcessStat) {
    await deleteAvailableMsg(ctx);
    return ctx
      .reply(
        "⛔️ تا دریافت کامل نتیجه درخواست داده شده پیشین، این گزینه غیرقابل استفاده میباشد.",
        backToMenu
      )
      .then((msg) => storeKeyID(ctx, msg.message_id));
  } else return next();
};

export default isUnderProcess;
