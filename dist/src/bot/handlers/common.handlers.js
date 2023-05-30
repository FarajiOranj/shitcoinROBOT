"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuCB = void 0;
const layout_1 = require("../layout/layout");
const starterUserUx_1 = require("../../../public/static/starterUserUx");
const deleteMsg_1 = __importDefault(require("../../helper/deleteMsg"));
const sessionKey_store_1 = __importDefault(require("../../helper/sessionKey.store"));
const menuCB = (ctx) => {
    var _a, _b;
    (0, deleteMsg_1.default)(ctx);
    ctx.session = null;
    const message = ((_b = (_a = ctx.update) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.text) === "/start"
        ? (0, starterUserUx_1.starterMessage)(ctx.from.first_name)
        : starterUserUx_1.menuMessage;
    ctx.telegram.sendMessage(ctx.chat.id, message, layout_1.mainMenu).then((0, sessionKey_store_1.default)(ctx));
};
exports.menuCB = menuCB;
