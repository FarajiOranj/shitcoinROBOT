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
exports.pendTxResToUser = void 0;
const bot_instance_1 = __importDefault(require("../bot.instance"));
const trackUx_1 = require("../../../public/static/trackUx");
const pendTxResToUser = (txData, wsData, chatId, replyMsgId) => __awaiter(void 0, void 0, void 0, function* () {
    bot_instance_1.default.telegram.sendMessage(chatId, (0, trackUx_1.pendMsg)(txData), {
        reply_to_message_id: replyMsgId,
    });
    yield wsData.transcat.off(wsData.event);
});
exports.pendTxResToUser = pendTxResToUser;
