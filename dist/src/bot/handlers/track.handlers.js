"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddrAnalysis = exports.pairOptSaver = void 0;
const bot_instance_1 = __importDefault(require("../bot.instance"));
const layout_1 = require("../layout/layout");
const trackUx_1 = require("../../../public/static/trackUx");
const starterUserUx_1 = require("../../../public/static/starterUserUx");
const deleteMsg_1 = __importDefault(require("../../helper/deleteMsg"));
const trackCB = (ctx) => {
    (0, deleteMsg_1.default)(ctx);
    bot_instance_1.default.telegram.sendMessage(ctx.chat.id, trackUx_1.trackOpts, layout_1.trackMenu);
};
//TODO! change "any" type later to an accurate type
const pairOptSaver = (ctx) => {
    var _a;
    (0, deleteMsg_1.default)(ctx);
    const chatId = ctx.chat.id;
    const data = (_a = ctx.callbackQuery) === null || _a === void 0 ? void 0 : _a["data"];
    //* maybe should change or move
    ctx.session = {};
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
    ctx.telegram.sendMessage(chatId, message, layout_1.backToMenu);
};
exports.pairOptSaver = pairOptSaver;
//TODO! change "any" type later to an accurate type
const AddrAnalysis = (ctx) => {
    var _a;
    (0, deleteMsg_1.default)(ctx);
    const triggerType = ctx.session.trackSession.triggerType;
    const givenAddress = ctx.message["text"];
    let sendAcceptionNotif;
    let continuousMsg;
    if (triggerType !== "toPaired") {
        if ((_a = ctx.session.trackSession) === null || _a === void 0 ? void 0 : _a.fromAddr) {
            if (triggerType === "bothPaired" && (ctx.session.trackSession.fromAddr === givenAddress)) {
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
            else
                continuousMsg = trackUx_1.toAddress;
        }
    }
    else {
        ctx.session.trackSession.toAddr = givenAddress;
        sendAcceptionNotif = true;
    }
    if (sendAcceptionNotif) {
        // only for test - will change
        ctx.reply("درخواست شما ثبت شد");
        ctx.telegram.sendMessage(ctx.chat.id, starterUserUx_1.menuMessage, layout_1.mainMenu);
    }
    else
        ctx.telegram.sendMessage(ctx.chat.id, continuousMsg, layout_1.backToMenu);
};
exports.AddrAnalysis = AddrAnalysis;
exports.default = trackCB;
