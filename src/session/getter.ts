import { SessionContext } from "telegraf/typings/session";
import redisClient from "./redis.session";
import getHashedKey from "../helper/session/hashKeyCalc";
import isJSON from "../helper/lib/jsonUtility";


type unAcceptablFalsies = null | undefined |  "";

const singleGetter = async (
  ctx: SessionContext<any>,
  field: string
): Promise<boolean | number | string | object | null> => {
  const hashedKey = getHashedKey(ctx);

  const fieldValue = await redisClient.hget(hashedKey, field);

  if(fieldValue === null) return null;

  const parsedValue = isJSON(fieldValue);

  if(typeof parsedValue === "number" || typeof parsedValue === "boolean" ) {
    return parsedValue
  }

  const realValue = parsedValue ?? fieldValue;

  return realValue;
};

// const multipleGetter = (ctx: SessionContext<any>, fields: Array<string>) :Promise<any> => {


// };

export { singleGetter, /* multipleGetter */ };
