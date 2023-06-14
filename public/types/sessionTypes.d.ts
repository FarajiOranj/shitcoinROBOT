import CommonStatus from "./commonStatus";

export interface TrackSession {
  commonStat: CommonStatus;
  triggerType?: string;
  fromAddr?: string;
  toAddr?: string;
  completed?: boolean;
}
