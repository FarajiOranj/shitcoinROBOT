import blake2 from "blake2";
import * as dotenv from "dotenv";
import { SessionContext } from "telegraf/typings/session";
dotenv.config();


const getHashedKey = (ctx: SessionContext<any>): string => {
    const {from, chat} = ctx;

  return blake2
    .createKeyedHash("blake2s", Buffer.from(process.env.MAGIC_SECRET), {digestLength: 8})
    .update(Buffer.from(`${from}:${chat}`))
    .digest("hex");
};

export default getHashedKey;
