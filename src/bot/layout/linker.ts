import Skeleton from "./skeleton";

const uniPairURLs = (tokenAddress: string, pairAddress: string): Skeleton => {
  return new Skeleton([
    [
      {
        text: "🦄UNISWAP",
        url: `https://app.uniswap.org/#/swap?outputCurrency=${tokenAddress}`,
      },
      { text: "🔎ETHscan", url: `https://etherscan.io/token/${tokenAddress}` },
    ],
    [
      {
        text: "👁‍🗨Sniffer",
        url: `https://tokensniffer.com/token/eth/${tokenAddress}`,
      },
    ],
    [
      {
        text: "📊Screener",
        url: `https://dexscreener.com/ethereum/${tokenAddress}`,
      },
      {
        text: "📈DEXT",
        url: `https://www.dextools.io/app/ether/pair-explorer/${pairAddress}`,
      },
    ],
  ]);
};

export { uniPairURLs };
