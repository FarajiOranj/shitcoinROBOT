import bot from "../bot.instance";
import ITxData from "../../../public/types/transaction";
import { pendMsg } from "../../../public/static/trackUx";


const pendTxResToUser = (
  txData: ITxData,
  chatId: number,
  replyMsgId: number
) => {
  bot.telegram.sendMessage(chatId, pendMsg(txData), {
    reply_to_message_id: replyMsgId,
  });
};

export { pendTxResToUser };
