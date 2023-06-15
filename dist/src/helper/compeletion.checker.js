"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isCompleted = (ctx, next) => {
    if (!ctx.session.trackSession.completed)
        return next();
    return;
};
exports.default = isCompleted;
