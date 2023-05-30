const trackOpts: string =
  "🖲 یکی از گزینه های مدنظر را انتخاب کرده و منتظر باشید.\n💡 در صورت نیاز به راهنمایی میتوانید به منو مراجعه کنید.";

const fromAddres: string =
  "⚪️ لطفا آدرس مبدا مورد نظر را ارسال نمایید.\n‼️ توجه: آدرس مبدا نمیتواند آدرس یک قرارداد هوشمند و یا آدرس null باشد.";

const toAddress: string = "⚫️ لطفا آدرس مقصد را وارد نمایید.";

const fromSubmitted: string = "☑️ آدرس مبدا ثبت شد.";

const bothPairedWarn: string =
  "⚠️ آدرس مبدا و مقصد نمیتواند در حالت '🔳 جفت شده' یکسان باشد!!!";

const invalidAddress: string =
  "❌ آدرس وارد شده نادرست میباشد.\n🔻 لطفا آدرس صحیح را وارد نمایید.";

const reqSent: string = "✅ درخواست شما با موفقیت ارسال شد.";

const resWillReply = (route: {
  from: string | undefined;
  to: string | undefined;
  isUnpaired: boolean;
}): string => {
  if (route.from === undefined) {
    route.from = "";
  } else route.from = `⚪️ مبدا: ${route.from}\n`;

  if (route.to === undefined) {
    route.to = "";
  } else route.to = `⚫️ مقصد: ${route.to}\n`;

  const OR: string = route.isUnpaired ? `یا\n` : "";

  return `❇️ نتیجه درخواست ارسال شده به مشخصات:\n\n${route.from}${OR}${route.to}\nبر روی همین پیام اعلان داده خواهد شد.`;
};

export {
  trackOpts,
  fromAddres,
  toAddress,
  fromSubmitted,
  bothPairedWarn,
  invalidAddress,
  reqSent,
  resWillReply,
};
