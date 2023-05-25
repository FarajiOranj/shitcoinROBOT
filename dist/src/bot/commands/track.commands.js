"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_instance_1 = __importDefault(require("../bot.instance"));
const track_handlers_1 = __importDefault(require("../handlers/track.handlers"));
bot_instance_1.default.hears("track", track_handlers_1.default);
