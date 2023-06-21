"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPairURLs = void 0;
const skeleton_1 = __importDefault(require("./skeleton"));
const uniPairURLs = (tokenAddress) => {
    return new skeleton_1.default([
        [
            {
                text: "🦄 UNISWAP",
                url: `https://app.uniswap.org/#/swap?outputCurrency=${tokenAddress}`,
            },
            { text: "🔎 ETHscan", url: `https://etherscan.io/token/${tokenAddress}` },
        ],
    ]);
};
exports.uniPairURLs = uniPairURLs;
