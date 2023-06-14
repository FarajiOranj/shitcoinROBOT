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
exports.givenPairNum = void 0;
const layout_1 = require("../layout/layout");
const sessionKey_store_1 = __importDefault(require("../../helper/sessionKey.store"));
const deleteMsg_1 = __importDefault(require("../../helper/deleteMsg"));
const pairFinderV2_1 = __importDefault(require("../../jobs/uni/pairFinderV2"));
const starterUserUx_1 = require("../../../public/static/starterUserUx");
const trackUx_1 = require("../../../public/static/trackUx");
const newUniPair = (ctx) => {
    (0, deleteMsg_1.default)(ctx);
    ctx.session.trackSession = {};
    ctx.session.trackSession.commonStat = "uniPair";
    ctx.telegram
        .sendMessage(ctx.chat.id, trackUx_1.uniPairNums, layout_1.backToMenu)
        .then((0, sessionKey_store_1.default)(ctx));
};
const givenPairNum = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    (0, deleteMsg_1.default)(ctx);
    ctx.session.trackSession.completed = true;
    ctx.session.underProcesses["uniNewPair"] = true;
    const chatId = ctx.chat.id;
    const totalPairs = Number(ctx.message["text"]);
    yield ctx.telegram
        .sendMessage(chatId, trackUx_1.reqSent, {
        reply_to_message_id: ctx.message.message_id,
    });
    yield ctx.telegram
        .sendMessage(chatId, (0, trackUx_1.willSentPairs)(totalPairs));
    (0, pairFinderV2_1.default)(ctx, chatId, totalPairs);
    ctx.telegram.sendMessage(chatId, starterUserUx_1.menuMessage, layout_1.mainMenu).then((0, sessionKey_store_1.default)(ctx));
});
exports.givenPairNum = givenPairNum;
exports.default = newUniPair;
