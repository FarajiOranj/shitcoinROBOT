"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storeKeyID = (ctx) => (message) => {
    var _a;
    if (!((_a = ctx.session) === null || _a === void 0 ? void 0 : _a.keyId))
        ctx.session.keyId = {};
    ctx.session.keyId = message.message_id;
};
exports.default = storeKeyID;
