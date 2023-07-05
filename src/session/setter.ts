import { SessionContext } from "telegraf/typings/session";
import redisClient from "./redis.session";
import getHashedKey from "../helper/session/hashKeyCalc";
import { stringifier } from "../helper/lib/jsonUtility";

const multipleSetter = (ctx: SessionContext<any>, fieldValues: object) => {
  const hashedKey = getHashedKey(ctx);

  for (let key in fieldValues) {
    if (typeof fieldValues[key] === "object") {
      fieldValues[key] = stringifier(fieldValues[key]);
    }
  }

  redisClient.hset(hashedKey, fieldValues);
  return fieldValues;
};

const singleSetter = (
  ctx: SessionContext<any>,
  field: string,
  value: boolean | number | string | object,
  oneTime?: boolean
) => {
  const hashedKey = getHashedKey(ctx);

  let updatedValue: number | string;

  if (typeof value === "boolean" || typeof value === "object")
    updatedValue = stringifier(value);
  else updatedValue = value;

  oneTime
    ? redisClient.hset(hashedKey, field, updatedValue)
    : redisClient.hsetnx(hashedKey, field, updatedValue);

  return updatedValue;
};

export { multipleSetter, singleSetter };
