"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const web3_1 = __importDefault(require("web3"));
const layout_1 = require("../layout/layout");
const trackUx_1 = require("../../../public/static/trackUx");
const hasCommonStat = (ctx, next) => {
    var _a;
    if ((_a = ctx.session.trackSession) === null || _a === void 0 ? void 0 : _a.commonStat)
        next();
    return;
};
const addressCheck = (ctx, next) => {
    web3_1.default.utils.checkAddressChecksum(ctx.message["text"]) ?
        next() :
        ctx.reply(trackUx_1.invalidAddress, layout_1.backToMenu);
};
const composedAddrMiddleware = telegraf_1.Telegraf.compose([hasCommonStat, addressCheck]);
exports.default = composedAddrMiddleware;
