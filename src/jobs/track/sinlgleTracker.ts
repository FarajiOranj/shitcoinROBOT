import pendingTxTracker from "../../provider/pendingTracker";
import { TrackSession } from "../../../public/types/sessionTypes";
import ITxData, { PairStat } from "../../../public/types/transaction";
import { pendTxResToUser } from "../../bot/server-reply/track.reply";

const singlePendingTxFinder = async (
  chatId: number,
  replyMsgId: number,
  trackBackData: TrackSession
) => {
  const { fromAddr, toAddr, triggerType } = trackBackData;

  pendingTxTracker({
      isPaired: triggerType as PairStat,
      from: fromAddr,
      to: toAddr,
      callback: (txData: ITxData) => pendTxResToUser(txData, chatId, replyMsgId),
  });
};

export { singlePendingTxFinder };
