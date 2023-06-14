"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const compeletion_checker_1 = __importDefault(require("../../helper/compeletion.checker"));
const hasUniPairStat = (ctx, next) => {
    var _a;
    if (((_a = ctx.session.trackSession) === null || _a === void 0 ? void 0 : _a.commonStat) === "uniPair")
        next();
    return;
};
const composedUniMiddleware = telegraf_1.Telegraf.compose([
    hasUniPairStat,
    compeletion_checker_1.default
]);
exports.default = composedUniMiddleware;
