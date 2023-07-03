import { Telegraf, Context } from "telegraf";
import { SessionContext } from "telegraf/typings/session";
import Web3 from "web3";
import { backToMenu } from "../layout/layout";
import { invalidAddress } from "../../../public/static/trackUx";
import storeKeyID from "../../helper/sessionKey.store";
import deleteAvailableMsg from "../../helper/deleteMsg";
import isCompleted from "../../helper/compeletion.checker";

const hasTrackNotifierStat = (ctx: SessionContext<any>, next: () => void) => {
  if (ctx.session.trackSession?.commonStat === "trackNotifier") next();
  return;
};

const addressCheck = async (ctx: Context, next: () => void) => {
  if (!Web3.utils.checkAddressChecksum(ctx.message["text"])) {
    await deleteAvailableMsg(ctx);
    return ctx
      .reply(invalidAddress, backToMenu)
      .then((msg) => storeKeyID(ctx, msg.message_id));
  } else return next();
};

const composedAddrMiddleware = Telegraf.compose([
  hasTrackNotifierStat,
  isCompleted,
  addressCheck,
]);

export default composedAddrMiddleware;
