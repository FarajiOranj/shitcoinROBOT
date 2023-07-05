import { SessionContext } from "telegraf/typings/session";
import redisClient from "../../session/redis.session";
import getHashedKey from "./hashKeyCalc";

interface IRegistration {
  registeredBefore: boolean;
  hashedKey: string;
}

const registration = Buffer.from("registration");

const userRegistration = async (
  ctx: SessionContext<any>
): Promise<IRegistration> => {
  const hashedKey = getHashedKey(ctx);

  const registeredBefore =
    (await redisClient.hget(hashedKey, registration)) !== null;

  if (!registeredBefore) redisClient.hset(hashedKey, registration, 1);

  return { registeredBefore, hashedKey };
};

export default userRegistration;
