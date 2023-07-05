import blake2 from "blake2";
import * as dotenv from "dotenv";
dotenv.config();

const getHashedKey = (userId: number, chatId: number): string => {
  return blake2
    .createKeyedHash("blake2s", Buffer.from(process.env.MAGIC_SECRET), {digestLength: 8})
    .update(Buffer.from(`${userId}:${chatId}`))
    .digest("hex");
};

console.log(getHashedKey(123,456));

export default getHashedKey;
