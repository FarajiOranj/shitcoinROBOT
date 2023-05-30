"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_instance_1 = __importDefault(require("../bot.instance"));
const registeredUsers_db_1 = __importDefault(require("../../db/registeredUsers.db"));
const starterUserUx_1 = require("../../../public/static/starterUserUx");
bot_instance_1.default.use((ctx, next) => {
    if (!registeredUsers_db_1.default.has(ctx.chat.id))
        return ctx.reply(starterUserUx_1.notAuthenticated);
    return next();
});
