import isUnderProccess from "../../helper/underProccess.checker";
import bot from "../bot.instance";
import newUniPair, { givenPairNum } from "../handlers/uniPairRv2.handlers";
import composedUniMiddleware from "../middlewares/uniPairRv2.middlewares";

bot.action("uniNewPair", isUnderProccess, newUniPair);

bot.hears(/^(10|[1-9])$/, composedUniMiddleware, givenPairNum);
