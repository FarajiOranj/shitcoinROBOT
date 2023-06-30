import Decimal from "decimal.js";

interface ILiquidity {
  liquidityInDollar: string;
  liquidityInETH: string;
}

const calculateShitcoinLiquidity = (
  injectedSupply: string,
  priceInDollar: string,
  priceInETH: string
): ILiquidity => {
  const liquidity = {
    liquidityInDollar: +priceInDollar,
    liquidityInETH: +priceInETH,
  };

  for (const [key, value] of Object.entries(liquidity)) {
    liquidity[key] = new Decimal(value * +injectedSupply).toFixed();
  }

  // @ts-ignore
  return liquidity;
};

export { calculateShitcoinLiquidity };
