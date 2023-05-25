"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_instance_1 = __importDefault(require("../bot.instance"));
const common_handlers_1 = require("../handlers/common.handlers");
bot_instance_1.default.start(common_handlers_1.menuCB);
bot_instance_1.default.action("start", common_handlers_1.menuCB);