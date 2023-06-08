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
const fs = require("fs");
const pendingTracker_1 = __importDefault(require("../../src/provider/pendingTracker"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function createFileCB(TxData, callback, comment) {
    callback.value++;
    fs.writeFile("txHistory.js", `${comment}\n${JSON.stringify(TxData)}\n`, { flag: "a", encoding: "utf-8" }, (err) => console.log(err));
    return true;
}
(function fileCreator() {
    (0, pendingTracker_1.default)({
        // from: whaleAddresses[0],
        to: process.env.UNI_ROUTE2,
        // isPaired: true,
        callback: (txData, callback) => createFileCB(txData, callback, "// new transaction"),
    });
})();
// asserstions, mocha and chai will be added ASAP.
