import pendingTxTracker from "../../provider/pendingTracker";
import { TrackSession } from "../../../public/types/sessionTypes";
import ITxData from "../../../public/types/transaction";
import { pendTxResToUser } from "../../bot/server-reply/track.reply";

const singlePendingTxFinder = async (
  chatId: number,
  replyMsgId: number,
  trackBackData: TrackSession
) => {
  const { fromAddr, toAddr, triggerType } = trackBackData;

  pendingTxTracker({
    isPaired: triggerType === "bothPaired",
    from: fromAddr?.toLowerCase(),
    to: toAddr?.toLowerCase(),
    callback: (txData: ITxData, calledTimes: {value:number}): boolean =>
      pendTxResToUser(txData, calledTimes, chatId, replyMsgId),
  });
};

export { singlePendingTxFinder };
