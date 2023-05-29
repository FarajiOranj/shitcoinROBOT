import Skeleton from "./skeleton";
/*
    Main Menu Reply Keyboard
    [ 📌 نشانه گذاری 🔎 ]
  ---------------------------------------
    Track Menu Reply Keyboard
    [⚫️ صرفا مقصد ] [⚪️ صرفا مبدا]
    [🔴 بدون ترتیب] [ 🔳 جفت شده ]
    [       ⬅️ بازگشت        ]
  ---------------------------------------
    back To Menu Reply Keyboard
    [ ⬅️ بازگشت ] */

const mainMenu = new Skeleton([
  [{ text: "📌 نشانه گذاری 🔎", callback_data: "track" }],
]).keyboardLayout;

const trackMenu = new Skeleton([
  [
    { text: "⚫️ صرفا مقصد", callback_data: "toPaired" },
    { text: "⚪️ صرفا مبدا", callback_data: "fromPaired" },
  ],
  [
    { text: "🔴 بدون ترتیب", callback_data: "unpaired" },
    { text: "🔳 جفت شده", callback_data: "bothPaired" },
  ],
  [{ text: "⬅️ بازگشت", callback_data: "menu" }],
]).keyboardLayout;

const backToMenu = new Skeleton([
  [{ text: "⬅️ بازگشت", callback_data: "menu" }],
]).keyboardLayout;

export { mainMenu, trackMenu, backToMenu };
