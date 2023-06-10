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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = require("./provider");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const { UNI_ROUTE2, ADDLIQETH_MID, PAIR_EID, WETH } = process.env;
// interface RouteObj {
//   from?: string;
//   to?: string;
// }
const eventName = { method: provider_1.AlchemySubscription.MINED_TRANSACTIONS };
const minedTxTracker = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    const { /* from, */ to, /* isPaired, */ callback } = queryData;
    let shouldOff;
    let calledTimes = {
        value: 1,
    };
    Object.assign(eventName, {
        addresses: [
            {
                to,
            },
        ],
    });
    provider_1.alchemy.ws.on(eventName, (tx) => __awaiter(void 0, void 0, void 0, function* () {
        if (shouldOff)
            yield provider_1.alchemy.ws.off(eventName);
        const { input, from, to, value, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, v, r, s, type, accessList, hash, blockHash, blockNumber, } = tx.transaction;
        shouldOff = yield callback({
            Input: { input },
            Route: { from, to },
            Fiscal: { value, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas },
            Sign: { nonce, v, r, s },
            TxInfo: { type, accessList, hash },
            BlockInfo: { blockHash, blockNumber },
        }, calledTimes);
    }));
});
// ---------test-------
minedTxTracker({
    to: UNI_ROUTE2,
    callback: (txData, calledTimes) => logCreatedPair(txData, calledTimes),
});
const logCreatedPair = (txData, calledTimes) => {
    var _a;
    const input = (_a = txData.Input.input) !== null && _a !== void 0 ? _a : "";
    let shouldOff;
    if (input.includes(ADDLIQETH_MID)) {
        provider_1.alchemy.core.getTransactionReceipt(txData.TxInfo.hash).then((res) => {
            res.logs.map((log) => {
                if (log.topics[0] === PAIR_EID) {
                    console.log(txData.TxInfo.hash);
                    if (log.topics[1] === WETH)
                        console.log(log.topics[2]);
                    else
                        console.log(log.topics[1]);
                    if (calledTimes.value === 3) {
                        shouldOff = true;
                    }
                    else
                        calledTimes.value++;
                }
            });
        });
    }
    return shouldOff;
};
exports.default = minedTxTracker;
