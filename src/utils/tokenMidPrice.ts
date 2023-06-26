import { ethers } from "ethers";
import Decimal from "decimal.js";
import * as dotenv from "dotenv";
dotenv.config();

//TODO: remember to move it to types folder.
interface IRateTypes {
  priceInETH: string;
  priceInDollar: string;
  perETH: string;
  perDollar: string;
  injectedSupply: string;
}

const calculateTokenPrice = (
  reservedTokens: Array<bigint>,
  shitcoinDecimal: number,
  ethPrice: number,
  isReserved0?: boolean,
) :IRateTypes => {
  let ShitcoinAmount, WETHAmount: number;

  if (isReserved0) {
    (ShitcoinAmount = +ethers.formatUnits(reservedTokens[0], shitcoinDecimal)),
      (WETHAmount = +ethers.formatUnits(reservedTokens[1]));
  } else {
    (ShitcoinAmount = +ethers.formatUnits(reservedTokens[1], shitcoinDecimal)),
      (WETHAmount = +ethers.formatUnits(reservedTokens[0]));
  }

  const priceInETH = WETHAmount / ShitcoinAmount;
  const perETH = ShitcoinAmount / WETHAmount;

  const rateTypes = {
    priceInETH,
    priceInDollar: priceInETH * ethPrice,
    perETH,
    perDollar: perETH / ethPrice,
    injectedSupply: ShitcoinAmount
  };

  for (const [key, value] of Object.entries(rateTypes)) {
    rateTypes[key] = new Decimal(value).toFixed();
  }

  // @ts-ignore
  return rateTypes;
};


export default calculateTokenPrice;
