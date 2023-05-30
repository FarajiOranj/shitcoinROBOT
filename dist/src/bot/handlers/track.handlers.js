"use strict";
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
const trackCB = (ctx) => {
    (0, deleteMsg_1.default)(ctx);
    ctx.telegram.sendMessage(ctx.chat.id, trackUx_1.trackOpts, layout_1.trackMenu);
};
//TODO! change "any" type later to an accurate type
const pairOptSaver = (ctx) => {
    var _a;
    (0, deleteMsg_1.default)(ctx);
    const chatId = ctx.chat.id;
    const data = (_a = ctx.callbackQuery) === null || _a === void 0 ? void 0 : _a["data"];
    //* maybe should change or move
    ctx.session.trackSession = {};
    ctx.session.trackSession.userId = chatId;
    ctx.session.trackSession.triggerType = data;
    ctx.session.trackSession.commonStat = "trackNotifier";
    const message = data === "toPaired" ? trackUx_1.toAddress : trackUx_1.fromAddres;
    /* TODO
     ! needs more researches to use - untested
     let data: string;
     if (ctx.has(callbackQuery("data"))) {
       data = ctx.callbackQuery.data // works!;
     }
     ctx.session.triggerType = data;
     */
    ctx.telegram.sendMessage(chatId, message, layout_1.backToMenu).then((0, sessionKey_store_1.default)(ctx));
};
exports.pairOptSaver = pairOptSaver;
//TODO! change "any" type later to an accurate type
const AddrAnalysis = (ctx) => {
    var _a;
    const triggerType = ctx.session.trackSession.triggerType;
    const givenAddress = ctx.message["text"];
    (0, deleteMsg_1.default)(ctx);
    let sendAcceptionNotif;
    let continuousMsg;
    if (triggerType !== "toPaired") {
        if ((_a = ctx.session.trackSession) === null || _a === void 0 ? void 0 : _a.fromAddr) {
            if (triggerType === "bothPaired" &&
                (ctx.session.trackSession.fromAddr === givenAddress)) {
                continuousMsg = trackUx_1.bothPairedWarn;
            }
            else {
                ctx.session.trackSession.toAddr = givenAddress;
                sendAcceptionNotif = true;
            }
        }
        else {
            ctx.session.trackSession.fromAddr = givenAddress;
            if (triggerType === "fromPaired")
                sendAcceptionNotif = true;
            else {
                ctx.telegram.sendMessage(ctx.chat.id, "آدرس مبدا ثبت شد.", { reply_to_message_id: ctx.message.message_id });
                continuousMsg = trackUx_1.toAddress;
            }
        }
    }
    else {
        ctx.session.trackSession.toAddr = givenAddress;
        sendAcceptionNotif = true;
    }
    if (sendAcceptionNotif) {
        ctx.session.trackSession.completed = true;
        // only for test - will change
        ctx.telegram.sendMessage(ctx.chat.id, "درخواست شما ثبت شد", { reply_to_message_id: ctx.message.message_id });
        ctx.telegram.sendMessage(ctx.chat.id, starterUserUx_1.menuMessage, layout_1.mainMenu).then((0, sessionKey_store_1.default)(ctx));
    }
    else
        ctx.telegram.sendMessage(ctx.chat.id, continuousMsg, layout_1.backToMenu).then((0, sessionKey_store_1.default)(ctx));
};
exports.AddrAnalysis = AddrAnalysis;
exports.default = trackCB;
