"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuCB = void 0;
const bot_instance_1 = __importDefault(require("../bot.instance"));
const layout_1 = require("../layout/layout");
const starterUserUx_1 = require("../../../public/static/starterUserUx");
const menuCB = (ctx) => {
    var _a, _b;
    const message = ((_b = (_a = ctx.update) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.text) === "/start"
        ? (0, starterUserUx_1.starterMessage)(ctx.from.first_name)
        : starterUserUx_1.menuMessage;
    bot_instance_1.default.telegram.sendMessage(ctx.chat.id, message, layout_1.mainMenu);
};
exports.menuCB = menuCB;
