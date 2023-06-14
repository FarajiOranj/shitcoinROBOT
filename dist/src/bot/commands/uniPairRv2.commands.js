"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const underProccess_checker_1 = __importDefault(require("../../helper/underProccess.checker"));
const bot_instance_1 = __importDefault(require("../bot.instance"));
const uniPairRv2_handlers_1 = __importStar(require("../handlers/uniPairRv2.handlers"));
const uniPairRv2_middlewares_1 = __importDefault(require("../middlewares/uniPairRv2.middlewares"));
bot_instance_1.default.action("uniNewPair", underProccess_checker_1.default, uniPairRv2_handlers_1.default);
bot_instance_1.default.hears(/^(10|[1-9])$/, uniPairRv2_middlewares_1.default, uniPairRv2_handlers_1.givenPairNum);
