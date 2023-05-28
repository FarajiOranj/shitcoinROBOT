//*TODO change file name later

// import { PairStat } from "./transaction";
import { CallbackQuery } from "telegraf/typings/core/types/typegram";
import CommonStatus from "./commonStatus";

export interface TrackSession {
    commonStat: CommonStatus,
    triggerType: string,
    fromAddr?: string,
    toAddr?: string,
    userId: number,
}