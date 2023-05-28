// import { PairStat } from "./transaction";
import { CallbackQuery } from "telegraf/typings/core/types/typegram";

export default interface trackSession {
    triggerType: string,
    fromAddr?: string,
    toAddr?: string,
    userId: number,
}