import bot from "../bot.instance";
import ITxData from "../../../public/types/transaction";
import { pendMsg } from "../../../public/static/trackUx";
import { ITrackerFn } from "../../../public/types/transaction";


const pendTxResToUser :ITrackerFn["callback"] = (
  txData: ITxData,
  calledTimes: {value: number},
  chatId: number,
  replyMsgId: number
) :boolean => {
  bot.telegram.sendMessage(chatId, pendMsg(txData), {
    reply_to_message_id: replyMsgId,
  });
  return true;
};

export { pendTxResToUser };
