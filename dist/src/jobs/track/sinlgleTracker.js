"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singlePendingTxFinder = void 0;
const pendingTracker_1 = __importDefault(require("../../provider/pendingTracker"));
const track_reply_1 = require("../../bot/server-reply/track.reply");
const singlePendingTxFinder = (chatId, replyMsgId, trackBackData) => __awaiter(void 0, void 0, void 0, function* () {
    const { fromAddr, toAddr, triggerType } = trackBackData;
    (0, pendingTracker_1.default)({
        isPaired: triggerType === "bothPaired",
        from: fromAddr === null || fromAddr === void 0 ? void 0 : fromAddr.toLowerCase(),
        to: toAddr === null || toAddr === void 0 ? void 0 : toAddr.toLowerCase(),
        callback: (txData, calledTimes) => (0, track_reply_1.pendTxResToUser)(txData, calledTimes, chatId, replyMsgId),
    });
});
exports.singlePendingTxFinder = singlePendingTxFinder;
