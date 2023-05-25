"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_instance_1 = __importDefault(require("../bot.instance"));
const layout_1 = require("../layout/layout");
const trackUx_1 = require("../../../public/static/trackUx");
const trackCB = (ctx) => {
    ctx.deleteMessage();
    bot_instance_1.default.telegram.sendMessage(ctx.chat.id, trackUx_1.trackOpts, layout_1.trackMenu);
};
exports.default = trackCB;
