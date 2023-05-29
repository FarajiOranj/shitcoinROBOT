//*TODO change file name later

// import { PairStat } from "./transaction";
import { CallbackQuery } from "telegraf/typings/core/types/typegram";
import CommonStatus from "./commonStatus";

export interface TrackSession {
    commonStat: CommonStatus,
    userId: number,
    triggerType: string,
    fromAddr?: string,
    toAddr?: string,
    completed?: boolean, 
}