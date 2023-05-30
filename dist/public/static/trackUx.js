"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resWillReply = exports.reqSent = exports.invalidAddress = exports.bothPairedWarn = exports.fromSubmitted = exports.toAddress = exports.fromAddres = exports.trackOpts = void 0;
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
    const OR = route.isUnpaired ? `یا\n` : "";
    return `❇️ نتیجه درخواست ارسال شده به مشخصات:\n\n${route.from}${OR}${route.to}\nبر روی همین پیام اعلان داده خواهد شد.`;
};
exports.resWillReply = resWillReply;
