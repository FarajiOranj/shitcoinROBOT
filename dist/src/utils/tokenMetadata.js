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
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_provider_1 = require("../provider/sdk-provider");
const getTokenMetadata = (tokenAddress) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    yield sdk_provider_1.alchemy.core.getTokenMetadata(tokenAddress).then((res) => (response = {
        name: res.name,
        symbol: res.symbol,
        decimals: res.decimals,
    }));
    return response;
});
exports.default = getTokenMetadata;
