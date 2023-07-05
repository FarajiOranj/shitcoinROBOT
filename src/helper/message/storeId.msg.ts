import { SessionContext } from "telegraf/typings/session";
import { singleSetter } from "../../session/setter";

const storMsgId = (ctx: SessionContext<any>, msgId: number): void => {
  singleSetter(ctx, "msgId", msgId);
};

export default storMsgId;
