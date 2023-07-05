import { SessionContext } from "telegraf/typings/session";
import { singleSetter } from "../../session/setter";

const storeKeyID = (ctx: SessionContext<any>, msgId: number): void => {
  singleSetter(ctx, "keyId", msgId);
};

export default storeKeyID;
