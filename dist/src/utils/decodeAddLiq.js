"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const abiCoder = ethers_1.ethers.AbiCoder.defaultAbiCoder();
const decodeAddLiq = (input) => {
    const decodedInput = abiCoder.decode([
        "address token",
        "uint256 amountTokenDesired",
        "uint256 amountTokenMin",
        "uint256 amountETHMin",
        "address to",
        "uint256 deadline",
    ], `0x${input.slice(10)}`);
    return {
        token: decodedInput.token,
        to: decodedInput.to,
        amountTokenDesired: Number(decodedInput.amountTokenDesired) / 10 ** 18,
        amountTokenMin: Number(decodedInput.amountTokenMin) / 10 ** 18,
        amountETHMin: Number(decodedInput.amountETHMin) / 10 ** 18,
        deadline: Number(decodedInput.deadline),
    };
};
// console.log(
//   decodeAddLiq(
//     "0xf305d71900000000000000000000000082442936178e86ab8b0c1341df34eb35c0c8a50c00000000000000000000000000000000000000064f964e68233a76f52000000000000000000000000000000000000000000000064f964e68233a76f5200000000000000000000000000000000000000000000000000000001bc16d674ec80000000000000000000000000000cc8376041353d4e56a877f25cd9053eab8ce4abc00000000000000000000000000000000000000000000000000000000647c6813"
//   )
// );
exports.default = decodeAddLiq;
