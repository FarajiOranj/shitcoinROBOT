"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minedTracker_1 = __importDefault(require("../provider/minedTracker"));
const uniPairV2_reply_1 = __importDefault(require("../bot/server-reply/uniPairV2.reply"));
(0, minedTracker_1.default)({
    to: process.env.UNI_ROUTE2,
    callback: (txData, wsData) => (0, uniPairV2_reply_1.default)(txData, wsData, JSON.parse(process.argv[3]), Number(process.argv[4]), Number(process.argv[5])),
});
