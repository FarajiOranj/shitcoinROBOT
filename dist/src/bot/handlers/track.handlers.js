"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairOptSaver = void 0;
const bot_instance_1 = __importDefault(require("../bot.instance"));
const layout_1 = require("../layout/layout");
const trackUx_1 = require("../../../public/static/trackUx");
const trackCB = (ctx) => {
    ctx.deleteMessage();
    bot_instance_1.default.telegram.sendMessage(ctx.chat.id, trackUx_1.trackOpts, layout_1.trackMenu);
};
const pairOptSaver = (ctx) => {
    var _a;
    ctx.deleteMessage();
    const chatId = ctx.chat.id;
    const data = (_a = ctx.callbackQuery) === null || _a === void 0 ? void 0 : _a["data"];
    ctx.session = {};
    ctx.session.userId = chatId;
    ctx.session.triggerType = data;
    const message = data === "toPaired" ? trackUx_1.toAddress : trackUx_1.fromAddres;
    /*
     needs more researches to use - untested
     let data: string;
     if (ctx.has(callbackQuery("data"))) {
       data = ctx.callbackQuery.data // works!;
     }
     ctx.session.triggerType = data;
     */
    ctx.telegram.sendMessage(chatId, message, layout_1.backToMenu);
};
exports.pairOptSaver = pairOptSaver;
bot_instance_1.default.hears("a", (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, ctx.session.triggerType);
});
exports.default = trackCB;
