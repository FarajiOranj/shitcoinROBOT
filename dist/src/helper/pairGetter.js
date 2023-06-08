"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const etherScanApi = "https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=";
const getPairAddress = (txHash) => {
    let create2Data;
    axios_1.default
        .get(`${etherScanApi}${txHash}`)
        .then((response) => {
        const data = response.data.result;
        data.map((obj) => {
            if (obj.type === "create2")
                create2Data = obj.contractAddress;
        });
        console.log(create2Data);
    })
        .catch((error) => {
        console.error(error);
    });
    return create2Data;
};
// const txHash =
//   "0x5b04ee73e9c4d78eb3ee376c5d52e20105e7400ace7891d5156587d42e5bcd5f";
// getPairAddress(txHash);
exports.default = getPairAddress;
