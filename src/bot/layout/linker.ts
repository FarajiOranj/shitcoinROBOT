import Skeleton from "./skeleton";

const uniPairURLs = (tokenAddress: string): Skeleton => {
  return new Skeleton([
    [
      {
        text: "🦄 UNISWAP",
        url: `https://app.uniswap.org/#/swap?outputCurrency=${tokenAddress}`,
    },
      { text: "🔎 ETHscan", url: `https://etherscan.io/token/${tokenAddress}` },
    ],
  ]);
};

export {
    uniPairURLs
}