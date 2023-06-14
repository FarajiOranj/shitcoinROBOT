"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deleteMsg_1 = __importDefault(require("./deleteMsg"));
const sessionKey_store_1 = __importDefault(require("./sessionKey.store"));
const layout_1 = require("../bot/layout/layout");
const isUnderProccess = (ctx, next) => {
    if (ctx.session.underProcesses[`${ctx.callbackQuery["data"]}`]) {
        (0, deleteMsg_1.default)(ctx);
        ctx.reply("⛔️ تا دریافت کامل نتیجه درخواست داده شده پیشین، این گزینه غیرقابل استفاده میباشد.", layout_1.backToMenu).then((0, sessionKey_store_1.default)(ctx));
    }
    else
        next();
};
exports.default = isUnderProccess;
