"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decimal_js_1 = __importDefault(require("decimal.js"));
const calculateTokenMarketCap = (totalSupply, priceInDollar, priceInETH) => {
    const marketCap = {
        marketCapInDollar: +priceInDollar,
        marketCapInETH: +priceInETH,
    };
    for (const [key, value] of Object.entries(marketCap)) {
        marketCap[key] = new decimal_js_1.default(value * +totalSupply).toFixed();
    }
    // @ts-ignore
    return marketCap;
};
exports.default = calculateTokenMarketCap;
