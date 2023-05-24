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
const routeTracker_1 = __importDefault(require("../../src/provider/routeTracker"));
const fs = require("fs");
function createFileCB(TxData, comment) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Pasting the text...");
        yield fs.writeFile("txHistory.js", `${comment}\n${JSON.stringify(TxData)}\n`, { flag: "a", encoding: "utf-8" }, (err) => console.log(err));
        console.log("End of file paste.");
    });
}
(function fileCreator() {
    console.log("Sending request...");
    (0, routeTracker_1.default)({
        // from: whaleAddresses[0],
        to: process.env.UNI_ROUTE2,
        // isPaired: 'BothPaired',
        callback: (txData) => createFileCB(txData, "// new transaction"),
    });
    console.log("Processing on server background");
})();
// asserstions, mocha and chai will be added ASAP.
