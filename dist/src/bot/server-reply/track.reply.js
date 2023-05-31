"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pendTxResToUser = void 0;
const bot_instance_1 = __importDefault(require("../bot.instance"));
const pendTxResToUser = (txData, chatId, replyMsgId) => {
    bot_instance_1.default.telegram.sendMessage(chatId, `${txData.TxInfo.hash}`, { reply_to_message_id: replyMsgId });
};
exports.pendTxResToUser = pendTxResToUser;
