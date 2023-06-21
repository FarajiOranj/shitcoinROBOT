"use strict";
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
const ethers_1 = require("ethers");
const decimal_js_1 = __importDefault(require("decimal.js"));
const common_provider_1 = __importDefault(require("../provider/common-provider"));
const fullErc20_abi_1 = require("../../public/abi/fullErc20.abi");
const getTokenSupply = (address, shitcoinDecimal) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenContract = new ethers_1.ethers.Contract(address, fullErc20_abi_1.erc20ABI, common_provider_1.default);
    let totalSupply = yield tokenContract.totalSupply();
    totalSupply = new decimal_js_1.default(ethers_1.ethers.formatUnits(totalSupply, shitcoinDecimal)).toFixed();
    return totalSupply;
});
// getTokenSupply("0x9c8f6552beD5CDf5eb10e2d1B29c416316379fB2", 18).then(console.log);
exports.default = getTokenSupply;
