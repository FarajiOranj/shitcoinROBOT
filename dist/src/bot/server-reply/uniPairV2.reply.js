"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPairV2 = void 0;
const bot_instance_1 = __importDefault(require("../bot.instance"));
const pairGetter_1 = __importDefault(require("../../helper/pairGetter"));
// import { pendMsg } from "../../../public/static/trackUx";
const uniPairV2 = (txData, calledTimes, chatId, totalPairs) => {
    var _a;
    const input = (_a = txData.Input.input) !== null && _a !== void 0 ? _a : "";
    if (input.includes("0xf305d719")) {
        const pairAddr = (0, pairGetter_1.default)(txData.TxInfo.hash);
        if (pairAddr) {
            bot_instance_1.default.telegram.sendMessage(chatId, pairAddr);
            if (totalPairs >= calledTimes.value)
                return true;
            else {
                calledTimes.value++;
                return false;
            }
        }
        else
            return false;
    }
    else
        return false;
};
exports.uniPairV2 = uniPairV2;
