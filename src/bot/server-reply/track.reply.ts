import bot from "../bot.instance";
import ITxData from "../../../public/types/transaction";

const pendTxResToUser = (txData: ITxData, chatId: number, replyMsgId: number) => {
    bot.telegram.sendMessage(chatId, `${txData.TxInfo.hash}`,{reply_to_message_id: replyMsgId});
}

export {
    pendTxResToUser
}