"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUniPairStat = void 0;
const hasUniPairStat = (ctx, next) => {
    var _a;
    if (((_a = ctx.session) === null || _a === void 0 ? void 0 : _a.commonStat) === "uniPair")
        next();
    return;
};
exports.hasUniPairStat = hasUniPairStat;
