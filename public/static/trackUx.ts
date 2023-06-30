import Web3 from "web3";
import ITxData from "../types/transaction";

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

const uniPairNums: string = "🔢 لطفا از 1 تا 100 یک عدد را ارسال نمایید.";

const resWillReply = (route: {
  from: string | undefined;
  to: string | undefined;
}): string => {
  if (route.from === undefined) {
    route.from = "";
  } else route.from = `⚪️ مبدا: ${route.from}\n`;

  if (route.to === undefined) {
    route.to = "";
  } else route.to = `⚫️ مقصد: ${route.to}\n`;

  return `❇️ نتیجه درخواست ارسال شده به مشخصات:\n\n${route.from}${route.to}\nبر روی همین پیام اعلان داده خواهد شد.`;
};

const pendMsg = (txData: ITxData): string => {
  const { from, to } = txData.Route;
  const { value, gas, gasPrice, maxFeePerGas } = txData.Fiscal;
  const { hash } = txData.TxInfo;

  const eth = +Web3.utils.toBN(value) / 10 ** 18;
  const convertedGas = +Web3.utils.toBN(gas) / 10 ** 18;

  const Nfee = convertedGas * +Web3.utils.toBN(gasPrice);
  const Ufee = convertedGas * +Web3.utils.toBN(maxFeePerGas);

  return `🔚 نتیجه درخواست داده شده به شرح زیر میباشد:\n\n⏳ وضعیت: ...pending\n⚪️ آدرس مبدا: ${from}\n⚫️ آدرس مقصد: ${to}\n\n💵 میزان اتریوم جا به جا شده: ${eth}\n🔥گس مصرفی محاسبه شده شبکه: ${Nfee}\n⚡️حداکثر گس مصرفی محاسبه شده کاربر: ${Ufee}\n\n📝 هش تراکنش:
  https://etherscan.io/tx/${hash}`;
};

const willSentPairs = (totalPairs: number): string => {
  return `❇️ به تعداد ${totalPairs} بار، میم کوین های جدید برای شما ارسال خواهند شد.`;
};

const uniPairFound = (
  name: string,
  symbol: string,
  tokenAddress: string,
  pairAddress: string,
  marketCapInDollar: string,
  marketCapInETH: string,
  liquidityInDollar: string,
  liquidityInETH: string,
  priceInDollar: string,
  priceInETH: string,
  totalSupply: string,
  injectedSupply: string,
  perDollar: string,
  perETH: string,
  ethPrice: number,
  reqNum: number
): string => {
  return `${name} | $${symbol}\n\n🔰 Token Address:\n${tokenAddress}\n\n⛓ Pair Address:\n${pairAddress}\n\n💵 Market Cap:\n${Math.round(
    Number(marketCapInDollar)
  )} $ / ${Number(marketCapInETH).toFixed(
    4
  )} ETH\n\n💰 Liquidity:\n${Math.round(
    Number(liquidityInDollar)
  )} $ / ${Number(liquidityInETH).toFixed(
    4
  )} ETH\n\n🌐 Total Supply:\n${totalSupply}\n🕸 Injected Supply:\n${injectedSupply} (${Math.round(
    +injectedSupply / +totalSupply
  )}% of Total Supply)\n\n💳 Price:\n${Number(priceInDollar).toFixed(
    12
  )} $\n${Number(priceInETH).toFixed(15)} ETH\n\n1️⃣ $ ≃ ${Number(
    perDollar
  ).toFixed(4)} ${symbol}\n1️⃣ ETH ≃ ${Number(perETH).toFixed(
    4
  )} ${symbol}\n\n🏦 ETH Price ≃ ${Math.round(
    ethPrice
  )} $\n\n\n☑️ نتیجه درخواست شماره ${reqNum}.`;
};

export {
  trackOpts,
  fromAddres,
  toAddress,
  fromSubmitted,
  bothPairedWarn,
  invalidAddress,
  reqSent,
  uniPairNums,
  resWillReply,
  pendMsg,
  willSentPairs,
  uniPairFound,
};
