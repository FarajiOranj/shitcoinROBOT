import pendingTxTracker from "../../provider/pendingTracker";
import { TrackSession } from "../../../public/types/sessionTypes";
import ITxData, { IWsData } from "../../../public/types/transaction";
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
    callback: (txData: ITxData, wsData: IWsData) =>
      pendTxResToUser(txData, wsData, chatId, replyMsgId),
  });
};

export { singlePendingTxFinder };
