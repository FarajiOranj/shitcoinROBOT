import Decimal from "decimal.js";

interface IMarketCap {
  marketCapInDollar: string;
  marketCapInETH: string;
}

const calculateTokenMarketCap = (
  totalSupply: string,
  priceInDollar: string,
  priceInETH: string
): IMarketCap => {
  const marketCap = {
    marketCapInDollar: +priceInDollar,
    marketCapInETH: +priceInETH,
  };

  for (const [key, value] of Object.entries(marketCap)) {
    marketCap[key] = new Decimal(value * +totalSupply).toFixed();
  }

  // @ts-ignore
  return marketCap;
};

export default calculateTokenMarketCap;
