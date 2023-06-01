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
const fs = require("fs");
const pendingTracker_1 = __importDefault(require("../../src/provider/pendingTracker"));
const trackedAddresses_1 = __importDefault(require("../../public/static/trackedAddresses"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function createFileCB(TxData, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.writeFile("txHistory.js", `${comment}\n${JSON.stringify(TxData)}\n`, { flag: "a", encoding: "utf-8" }, (err) => console.log(err));
    });
}
(function fileCreator() {
    (0, pendingTracker_1.default)({
        from: trackedAddresses_1.default[0],
        to: process.env.UNI_ROUTE2,
        isPaired: 'bothPaired',
        callback: (txData) => createFileCB(txData, "// new transaction"),
    });
})();
// asserstions, mocha and chai will be added ASAP.
