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
exports.AddrAnalysis = exports.pairOptSaver = void 0;
const layout_1 = require("../layout/layout");
const trackUx_1 = require("../../../public/static/trackUx");
const starterUserUx_1 = require("../../../public/static/starterUserUx");
const deleteMsg_1 = __importDefault(require("../../helper/deleteMsg"));
const sessionKey_store_1 = __importDefault(require("../../helper/sessionKey.store"));
const sinlgleTracker_1 = require("../../jobs/track/sinlgleTracker");
const trackCB = (ctx) => {
    (0, deleteMsg_1.default)(ctx);
    ctx.telegram
        .sendMessage(ctx.chat.id, trackUx_1.trackOpts, layout_1.trackMenu)
        .then((0, sessionKey_store_1.default)(ctx));
};
//TODO! change "any" type later to an accurate type
const pairOptSaver = (ctx) => {
    var _a;
    (0, deleteMsg_1.default)(ctx);
    const chatId = ctx.chat.id;
    const data = (_a = ctx.callbackQuery) === null || _a === void 0 ? void 0 : _a["data"];
    //* maybe should change or move
    ctx.session.trackSession = {};
    ctx.session.trackSession.triggerType = data;
    ctx.session.trackSession.commonStat = "trackNotifier";
    /* TODO
    ! needs more researches to use - untested
    let data: string;
    if (ctx.has(callbackQuery("data"))) {
      data = ctx.callbackQuery.data // works!;
    }
    ctx.session.triggerType = data;
    */
    ctx.telegram.sendMessage(chatId, trackUx_1.fromAddres, layout_1.backToMenu).then((0, sessionKey_store_1.default)(ctx));
};
exports.pairOptSaver = pairOptSaver;
//TODO! change "any" type later to an accurate type
const AddrAnalysis = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const triggerType = ctx.session.trackSession.triggerType === "bothPaired";
    const givenAddress = ctx.message["text"];
    const chatId = ctx.chat.id;
    (0, deleteMsg_1.default)(ctx);
    let sendAcceptionNotif;
    let continuousMsg;
    if ((_a = ctx.session.trackSession) === null || _a === void 0 ? void 0 : _a.fromAddr) {
        if (ctx.session.trackSession.fromAddr === givenAddress) {
            continuousMsg = trackUx_1.bothPairedWarn;
        }
        else {
            ctx.session.trackSession.toAddr = givenAddress;
            sendAcceptionNotif = true;
        }
    }
    else {
        ctx.session.trackSession.fromAddr = givenAddress;
        if (!triggerType)
            sendAcceptionNotif = true;
        else {
            ctx.telegram.sendMessage(chatId, trackUx_1.fromSubmitted, {
                reply_to_message_id: ctx.message.message_id,
            });
            continuousMsg = trackUx_1.toAddress;
        }
    }
    if (sendAcceptionNotif) {
        let replyMsgId;
        ctx.session.trackSession.completed = true;
        yield ctx.telegram.sendMessage(chatId, trackUx_1.reqSent, {
            reply_to_message_id: ctx.message.message_id,
        });
        yield ctx.telegram
            .sendMessage(chatId, (0, trackUx_1.resWillReply)({
            from: (_b = ctx.session.trackSession) === null || _b === void 0 ? void 0 : _b.fromAddr,
            to: (_c = ctx.session.trackSession) === null || _c === void 0 ? void 0 : _c.toAddr,
        }))
            .then((message) => (replyMsgId = message.message_id));
        (0, sinlgleTracker_1.singlePendingTxFinder)(chatId, replyMsgId, ctx.session.trackSession);
        ctx.telegram
            .sendMessage(chatId, starterUserUx_1.menuMessage, layout_1.mainMenu)
            .then((0, sessionKey_store_1.default)(ctx));
    }
    else
        ctx.telegram
            .sendMessage(chatId, continuousMsg, layout_1.backToMenu)
            .then((0, sessionKey_store_1.default)(ctx));
});
exports.AddrAnalysis = AddrAnalysis;
exports.default = trackCB;
