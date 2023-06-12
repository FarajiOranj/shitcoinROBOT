"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPairFound = exports.willSentPairs = exports.pendMsg = exports.resWillReply = exports.uniPairNums = exports.reqSent = exports.invalidAddress = exports.bothPairedWarn = exports.fromSubmitted = exports.toAddress = exports.fromAddres = exports.trackOpts = void 0;
const web3_1 = __importDefault(require("web3"));
const trackOpts = "🖲 یکی از گزینه های مدنظر را انتخاب کرده و منتظر باشید.\n💡 در صورت نیاز به راهنمایی میتوانید به منو مراجعه کنید.";
exports.trackOpts = trackOpts;
const fromAddres = "⚪️ لطفا آدرس مبدا مورد نظر را ارسال نمایید.\n‼️ توجه: آدرس مبدا نمیتواند آدرس یک قرارداد هوشمند و یا آدرس null باشد.";
exports.fromAddres = fromAddres;
const toAddress = "⚫️ لطفا آدرس مقصد را وارد نمایید.";
exports.toAddress = toAddress;
const fromSubmitted = "☑️ آدرس مبدا ثبت شد.";
exports.fromSubmitted = fromSubmitted;
const bothPairedWarn = "⚠️ آدرس مبدا و مقصد نمیتواند در حالت '🔳 جفت شده' یکسان باشد!!!";
exports.bothPairedWarn = bothPairedWarn;
const invalidAddress = "❌ آدرس وارد شده نادرست میباشد.\n🔻 لطفا آدرس صحیح را وارد نمایید.";
exports.invalidAddress = invalidAddress;
const reqSent = "✅ درخواست شما با موفقیت ارسال شد.";
exports.reqSent = reqSent;
const uniPairNums = "🔢 لطفا از 1 تا 10 یک عدد را ارسال نمایید.";
exports.uniPairNums = uniPairNums;
const resWillReply = (route) => {
    if (route.from === undefined) {
        route.from = "";
    }
    else
        route.from = `⚪️ مبدا: ${route.from}\n`;
    if (route.to === undefined) {
        route.to = "";
    }
    else
        route.to = `⚫️ مقصد: ${route.to}\n`;
    return `❇️ نتیجه درخواست ارسال شده به مشخصات:\n\n${route.from}${route.to}\nبر روی همین پیام اعلان داده خواهد شد.`;
};
exports.resWillReply = resWillReply;
const pendMsg = (txData) => {
    const { from, to } = txData.Route;
    const { value, gas, gasPrice, maxFeePerGas } = txData.Fiscal;
    const { hash } = txData.TxInfo;
    const eth = +web3_1.default.utils.toBN(value) / 10 ** 18;
    const convertedGas = +web3_1.default.utils.toBN(gas) / 10 ** 18;
    const Nfee = convertedGas * +web3_1.default.utils.toBN(gasPrice);
    const Ufee = convertedGas * +web3_1.default.utils.toBN(maxFeePerGas);
    return `🔚 نتیجه درخواست داده شده به شرح زیر میباشد:\n\n⏳ وضعیت: ...pending\n⚪️ آدرس مبدا: ${from}\n⚫️ آدرس مقصد: ${to}\n\n💵 میزان اتریوم جا به جا شده: ${eth}\n🔥گس مصرفی محاسبه شده شبکه: ${Nfee}\n⚡️حداکثر گس مصرفی محاسبه شده کاربر: ${Ufee}\n\n📝 هش تراکنش:
  https://etherscan.io/tx/${hash}`;
};
exports.pendMsg = pendMsg;
const willSentPairs = (totalPairs) => {
    return `❇️ به تعداد${totalPairs} بار، میم کوین های جدید برای شما ارسال خواهند شد.`;
};
exports.willSentPairs = willSentPairs;
const uniPairFound = (name, symbol, tokenAddress, tokenPairAddres, marketCap, liquidity, reqNum) => {
    return `🅰️ نام توکن: ${name}\n🅱️ نماد توکن: ${symbol}\n\n🆔 آدرس میم کوین: ${tokenAddress}\n⛓ آدرس جفت ارز توکن: ${tokenPairAddres}\n\n💰 نقدینگی: ${liquidity}\n💵 ارزش بازار: ${marketCap}\n\n❕نتیجه شماره ${reqNum}`;
};
exports.uniPairFound = uniPairFound;
