import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const provider = new ethers.AlchemyProvider("mainnet", process.env.ALCHEMY_API_KEY);

export default provider;
