"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backward = exports.starter = void 0;
const bot_instance_1 = __importDefault(require("../bot.instance"));
const common_handlers_1 = require("../handlers/common.handlers");
const backward = bot_instance_1.default.action("start", common_handlers_1.menuCB);
exports.backward = backward;
const starter = bot_instance_1.default.start(common_handlers_1.menuCB);
exports.starter = starter;
