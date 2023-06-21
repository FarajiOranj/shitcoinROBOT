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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_instance_1 = __importDefault(require("../bot.instance"));
const sdk_provider_1 = require("../../provider/sdk-provider");
const tokenMetadata_1 = __importDefault(require("../../utils/tokenMetadata"));
const trackUx_1 = require("../../../public/static/trackUx");
const linker_1 = require("../layout/linker");
const dotenv = __importStar(require("dotenv"));
const tokenMidPrice_1 = __importDefault(require("../../utils/tokenMidPrice"));
const tokenTotalSupply_1 = __importDefault(require("../../utils/tokenTotalSupply"));
const tokenMarketCap_1 = __importDefault(require("../../utils/tokenMarketCap"));
const reservedTokens_1 = require("../../utils/reservedTokens");
dotenv.config();
const { ADDLIQETH_MID, PAIR_EID, MINT_EID, WETH } = process.env;
const uniPairV2 = (txData, wsData, chatId, totalPairs) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const input = (_a = txData.Input.input) !== null && _a !== void 0 ? _a : "";
    if (input.includes(ADDLIQETH_MID)) {
        const { calledTimes } = wsData;
        let pairLog, mintLog;
        yield sdk_provider_1.alchemy.core.getTransactionReceipt(txData.TxInfo.hash).then((res) => {
            pairLog = res.logs.find((log) => log.topics[0] === PAIR_EID);
            if (pairLog)
                mintLog = res.logs.find((log) => log.topics[0] === MINT_EID);
        });
        if (pairLog) {
            const token0Address = `0x${pairLog.topics[1].slice(26)}`;
            const mainToken = pairLog.topics[1].includes(WETH)
                ? `0x${pairLog.topics[2].slice(26)}`
                : token0Address;
            const uniPair = `0x${pairLog.data.slice(26, 66)}`;
            const { name, symbol, decimals } = yield (0, tokenMetadata_1.default)(mainToken);
            const reservedTokens = (0, reservedTokens_1.decodeReservedTokens)(mintLog.data);
            const { priceInETH, priceInDollar, perETH, perDollar } = (0, tokenMidPrice_1.default)(reservedTokens, decimals, mainToken === token0Address);
            const totalSupply = yield (0, tokenTotalSupply_1.default)(mainToken, decimals);
            const { marketCapInDollar, marketCapInETH } = (0, tokenMarketCap_1.default)(totalSupply, priceInDollar, priceInETH);
            yield bot_instance_1.default.telegram.sendMessage(chatId, (0, trackUx_1.uniPairFound)(name, symbol, mainToken, uniPair, priceInDollar, priceInETH, marketCapInDollar, marketCapInETH, "As Soon As Possible...", perDollar, perETH, calledTimes.value), (0, linker_1.uniPairURLs)(mainToken).keyboardLayout);
            if (calledTimes.value >= totalPairs) {
                yield wsData.transcat.off(wsData.event);
                process.exit();
            }
            else
                calledTimes.value++;
        }
    }
});
exports.default = uniPairV2;
