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
const ethers_1 = require("ethers");
const decimal_js_1 = __importDefault(require("decimal.js"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const calculateTokenPrice = (reservedTokens, shitcoinDecimal, isReserved0) => {
    let ShitcoinAmount, WETHAmount;
    if (isReserved0) {
        (ShitcoinAmount = +ethers_1.ethers.formatUnits(reservedTokens[0], shitcoinDecimal)),
            (WETHAmount = +ethers_1.ethers.formatUnits(reservedTokens[1]));
    }
    else {
        (ShitcoinAmount = +ethers_1.ethers.formatUnits(reservedTokens[1], shitcoinDecimal)),
            (WETHAmount = +ethers_1.ethers.formatUnits(reservedTokens[0]));
    }
    const priceInETH = WETHAmount / ShitcoinAmount;
    const perETH = ShitcoinAmount / WETHAmount;
    const rateTypes = {
        priceInETH,
        priceInDollar: priceInETH * 1730,
        perETH,
        perDollar: perETH / 1730,
    };
    for (const [key, value] of Object.entries(rateTypes)) {
        rateTypes[key] = new decimal_js_1.default(value).toFixed();
    }
    // @ts-ignore
    return rateTypes;
};
exports.default = calculateTokenPrice;
