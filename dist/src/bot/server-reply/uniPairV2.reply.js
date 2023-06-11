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
const bot_instance_1 = __importDefault(require("../bot.instance"));
const provider_1 = require("../../provider/provider");
// import { pendMsg } from "../../../public/static/trackUx";
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const { ADDLIQETH_MID, PAIR_EID, WETH } = process.env;
const uniPairV2 = (txData, wsData, chatId, totalPairs) => {
    var _a;
    const input = (_a = txData.Input.input) !== null && _a !== void 0 ? _a : "";
    if (input.includes(ADDLIQETH_MID)) {
        const { calledTimes } = wsData;
        provider_1.alchemy.core.getTransactionReceipt(txData.TxInfo.hash).then((res) => {
            res.logs.map((log) => {
                if (log.topics[0] === PAIR_EID) {
                    console.log(txData.TxInfo.hash);
                    const mainToken = log.topics[1].includes(WETH)
                        ? log.topics[2]
                        : log.topics[1];
                    bot_instance_1.default.telegram.sendMessage(chatId, `0x${mainToken.slice(26)}`);
                    if (calledTimes.value >= totalPairs) {
                        provider_1.alchemy.ws.off(wsData.event);
                    }
                    else
                        calledTimes.value++;
                }
            });
        });
    }
};
exports.default = uniPairV2;
