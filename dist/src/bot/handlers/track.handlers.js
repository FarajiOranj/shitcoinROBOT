"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddrAnalysis = exports.pairOptSaver = void 0;
const bot_instance_1 = __importDefault(require("../bot.instance"));
const layout_1 = require("../layout/layout");
const trackUx_1 = require("../../../public/static/trackUx");
const web3_1 = __importDefault(require("web3"));
const starterUserUx_1 = require("../../../public/static/starterUserUx");
const trackCB = (ctx) => {
    ctx.deleteMessage();
    bot_instance_1.default.telegram.sendMessage(ctx.chat.id, trackUx_1.trackOpts, layout_1.trackMenu);
};
const pairOptSaver = (ctx) => {
    var _a;
    ctx.deleteMessage();
    const chatId = ctx.chat.id;
    const data = (_a = ctx.callbackQuery) === null || _a === void 0 ? void 0 : _a["data"];
    //! maybe should change or move
    ctx.session = {};
    ctx.session.userId = chatId;
    ctx.session.triggerType = data;
    ctx.session.commonStat = "trackNotifier";
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
const AddrAnalysis = (ctx) => {
    // ctx.deleteMessage();
    var _a;
    //TODO! add as middleware
    if ((_a = ctx.session) === null || _a === void 0 ? void 0 : _a.commonStat) {
        if (!web3_1.default.utils.checkAddressChecksum(ctx.message["text"]))
            ctx.reply(trackUx_1.invalidAddress, layout_1.backToMenu);
        if (ctx.session.triggerType !== "toPaired") {
        }
        else {
            // only for test - will change
            ctx.reply("درخواست شما ثبت شد");
            ctx.telegram.sendMessage(ctx.chat.id, starterUserUx_1.menuMessage, layout_1.mainMenu);
        }
    }
};
exports.AddrAnalysis = AddrAnalysis;
// if(ctx.session?.toAddr) {}
exports.default = trackCB;
