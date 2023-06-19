import { ethers } from "ethers";
import Decimal from "decimal.js";
import provider from "../provider/common-provider";
import { erc20ABI } from "../../public/abi/fullErc20.abi";

const getTokenSupply = async (
  address: string,
  shitcoinDecimal: number
): Promise<string> => {
  const tokenContract = new ethers.Contract(address, erc20ABI, provider);
  let totalSupply = await tokenContract.totalSupply();

  totalSupply = new Decimal(
    ethers.formatUnits(totalSupply, shitcoinDecimal)
  ).toFixed();

  return totalSupply;
};

// getTokenSupply("0x9c8f6552beD5CDf5eb10e2d1B29c416316379fB2", 18).then(console.log);

export default getTokenSupply;
