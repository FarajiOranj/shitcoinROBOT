"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const web3_1 = __importDefault(require("web3"));
const layout_1 = require("../layout/layout");
const trackUx_1 = require("../../../public/static/trackUx");
const sessionKey_store_1 = __importDefault(require("../../helper/sessionKey.store"));
const deleteMsg_1 = __importDefault(require("../../helper/deleteMsg"));
const hasTrackNotifierStat = (ctx, next) => {
    var _a, _b;
    if (((_b = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.trackSession) === null || _b === void 0 ? void 0 : _b.commonStat) === "trackNotifier")
        next();
    return;
};
const isCompleted = (ctx, next) => {
    if (!ctx.session.trackSession.completed)
        next();
    return;
};
const addressCheck = (ctx, next) => {
    if (!web3_1.default.utils.checkAddressChecksum(ctx.message["text"])) {
        (0, deleteMsg_1.default)(ctx);
        ctx.reply(trackUx_1.invalidAddress, layout_1.backToMenu).then((0, sessionKey_store_1.default)(ctx));
    }
    else
        next();
};
const composedAddrMiddleware = telegraf_1.Telegraf.compose([
    hasTrackNotifierStat,
    isCompleted,
    addressCheck,
]);
exports.default = composedAddrMiddleware;
