import { SessionContext } from "telegraf/typings/session";
import redisClient from "../../session/redis.session";
import getHashedKey from "./hashKeyCalc";

interface IRegistration {
  isRegistered: boolean;
  hashedKey: string;
}

const registration = Buffer.from("registration");

const userRegistration = async (
  ctx: SessionContext<any>
): Promise<IRegistration> => {
  const hashedKey = getHashedKey(ctx.from.id, ctx.chat.id);

  const isRegistered =
    (await redisClient.hget(hashedKey, registration)) !== null;

  if (!isRegistered) redisClient.hset(hashedKey, registration, 1);

  return { isRegistered, hashedKey };
};

export default userRegistration;
