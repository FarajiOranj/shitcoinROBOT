"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pendTxResToUser = void 0;
const bot_instance_1 = __importDefault(require("../bot.instance"));
const trackUx_1 = require("../../../public/static/trackUx");
const provider_1 = require("../../provider/provider");
const pendTxResToUser = (txData, wsData, chatId, replyMsgId) => {
    bot_instance_1.default.telegram.sendMessage(chatId, (0, trackUx_1.pendMsg)(txData), {
        reply_to_message_id: replyMsgId,
    });
    provider_1.alchemy.ws.off(wsData.event);
};
exports.pendTxResToUser = pendTxResToUser;
