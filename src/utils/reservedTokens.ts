import { ethers } from "ethers";
import provider from "../provider/common-provider";
import { PairABI } from "../../public/abi/uniPair.abi";

const decodeReservedTokens = (data: string): Array<bigint> => {
  return ethers.AbiCoder.defaultAbiCoder().decode(["uint256", "uint256"], data);
};

const getReservedTokens = async (
  pairAddress: string
): Promise<Array<bigint>> => {
  const pairContract = new ethers.Contract(pairAddress, PairABI, provider);
  return pairContract.getReserves();
};

export { decodeReservedTokens, getReservedTokens };
