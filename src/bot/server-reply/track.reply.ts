import bot from "../bot.instance";
import ITxData, { IWsData } from "../../../public/types/transaction";
import { pendMsg } from "../../../public/static/trackUx";
import { ITrackerFn } from "../../../public/types/transaction";
import { alchemy } from "../../provider/provider";

const pendTxResToUser: ITrackerFn["callback"] = (
  txData: ITxData,
  wsData: IWsData,
  chatId: number,
  replyMsgId: number
): void => {
  bot.telegram.sendMessage(chatId, pendMsg(txData), {
    reply_to_message_id: replyMsgId,
  });
  alchemy.ws.off(wsData.event);
};

export { pendTxResToUser };
