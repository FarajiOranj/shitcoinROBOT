import { alchemy } from "../provider/provider";

interface ITokenMetadata {
  name: string;
  symbol: string;
  decimals: number;
}

const getTokenMetadata = async (
  tokenAddress: string
): Promise<ITokenMetadata> => {
  let response: ITokenMetadata;
  await alchemy.core.getTokenMetadata(tokenAddress).then(
    (res) =>
      (response = {
        name: res.name,
        symbol: res.symbol,
        decimals: res.decimals,
      })
  );
  return response;
};

export default getTokenMetadata;
export { ITokenMetadata };
