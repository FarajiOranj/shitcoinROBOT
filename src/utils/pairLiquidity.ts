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

  const totalValue: number = +injectedSupply * 2;

  for (const [key, value] of Object.entries(liquidity)) {
    liquidity[key] = new Decimal(value * totalValue).toFixed();
  }

  // @ts-ignore
  return liquidity;
};

export { calculateShitcoinLiquidity };
