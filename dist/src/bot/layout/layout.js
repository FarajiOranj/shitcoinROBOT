"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backToMenu = exports.trackMenu = exports.mainMenu = void 0;
const skeleton_1 = __importDefault(require("./skeleton"));
/*
    Main Menu Reply Keyboard
    [ 📌 نشانه گذاری 🔎 ]
  ---------------------------------------
    Track Menu Reply Keyboard
    [ 🔳 جفت شده ] [⚪️ صرفا مبدا]
    [       ⬅️ بازگشت        ]
  ---------------------------------------
    back To Menu Reply Keyboard
    [ ⬅️ بازگشت ]
*/
const mainMenu = new skeleton_1.default([
    [{ text: "📌 نشانه گذاری 🔎", callback_data: "track" }],
    [{ text: "🆕 میم کوین جدید 🔥", callback_data: "uniNewPair" }]
]).keyboardLayout;
exports.mainMenu = mainMenu;
const trackMenu = new skeleton_1.default([
    [
        { text: "🔳 جفت شده", callback_data: "bothPaired" },
        { text: "⚪️ صرفا مبدا", callback_data: "fromPaired" },
    ],
    [{ text: "⬅️ بازگشت", callback_data: "menu" }],
]).keyboardLayout;
exports.trackMenu = trackMenu;
const backToMenu = new skeleton_1.default([
    [{ text: "⬅️ بازگشت", callback_data: "menu" }],
]).keyboardLayout;
exports.backToMenu = backToMenu;
