"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteAvailableMsg = (ctx) => {
    try {
        ctx.deleteMessage();
    }
    catch (_a) { }
};
exports.default = deleteAvailableMsg;
