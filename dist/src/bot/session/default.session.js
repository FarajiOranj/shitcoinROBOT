"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const bot_instance_1 = __importDefault(require("../bot.instance"));
bot_instance_1.default.use((0, telegraf_1.session)());
