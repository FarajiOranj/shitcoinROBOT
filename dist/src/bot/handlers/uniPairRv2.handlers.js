"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.givenPairNum = void 0;
const layout_1 = require("../layout/layout");
const sessionKey_store_1 = __importDefault(require("../../helper/sessionKey.store"));
const deleteMsg_1 = __importDefault(require("../../helper/deleteMsg"));
const pairFinderV2_1 = __importDefault(require("../../jobs/uni/pairFinderV2"));
const starterUserUx_1 = require("../../../public/static/starterUserUx");
const trackUx_1 = require("../../../public/static/trackUx");
const newUniPair = (ctx) => {
    (0, deleteMsg_1.default)(ctx);
    ctx.session.commonStat = {};
    ctx.session.commonStat = "uniPair";
    ctx.telegram
        .sendMessage(ctx.chat.id, trackUx_1.uniPairNums, layout_1.backToMenu)
        .then((0, sessionKey_store_1.default)(ctx));
};
const givenPairNum = (ctx) => {
    (0, deleteMsg_1.default)(ctx);
    const chatId = ctx.chat.id;
    // ctx.telegram
    // .sendMessage(chatId, )
    (0, pairFinderV2_1.default)(chatId, ctx.message["text"]);
    ctx.telegram
        .sendMessage(chatId, starterUserUx_1.menuMessage, layout_1.mainMenu)
        .then((0, sessionKey_store_1.default)(ctx));
};
exports.givenPairNum = givenPairNum;
exports.default = newUniPair;
