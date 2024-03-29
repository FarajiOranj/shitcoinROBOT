import {Alchemy, Network, AlchemySubscription} from 'alchemy-sdk';

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export {
  alchemy,
  AlchemySubscription
};