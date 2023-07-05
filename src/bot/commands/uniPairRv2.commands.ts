import isUnderProcess from "../../helper/checker/underProcess.checker";
import bot from "../bot.instance";
import newUniPair, { givenPairNum } from "../handlers/uniPairRv2.handlers";
import composedUniMiddleware from "../middlewares/uniPairRv2.middlewares";

bot.action("uniNewPair", isUnderProcess, newUniPair);

bot.hears(/^(?:[1-9][0-9]?|100)$/, composedUniMiddleware, givenPairNum);
