import { Telegraf, Context } from "telegraf";
import { SessionContext } from "telegraf/typings/session";
import Web3 from "web3";
import { backToMenu } from "../layout/layout";
import { invalidAddress } from "../../../public/static/trackUx";
import storeMsgId from "../../helper/message/storeId.msg";
import deleteAvailableMsg from "../../helper/message/delete.msg";
import isCompleted from "../../helper/checker/completion.checker";

const hasTrackNotifierStat = (ctx: SessionContext<any>, next: () => void) => {
  if (ctx.session.trackSession?.commonStat === "trackNotifier") next();
  return;
};

const addressCheck = async (ctx: Context, next: () => void) => {
  if (!Web3.utils.checkAddressChecksum(ctx.message["text"])) {
    await deleteAvailableMsg(ctx);
    return ctx
      .reply(invalidAddress, backToMenu)
      .then((msg) => storeMsgId(ctx, msg.message_id));
  } else return next();
};

const composedAddrMiddleware = Telegraf.compose([
  hasTrackNotifierStat,
  isCompleted,
  addressCheck,
]);

export default composedAddrMiddleware;
