import bot from "../bot.instance";
import newUniPair, { givenPairNum } from "../handlers/uniPairRv2.handlers";
import { hasUniPairStat } from "../middlewares/uniPairRv2.middlewares";


bot.action("uniNewPair", newUniPair);


bot.hears("/^(10|[1-9])$/", hasUniPairStat, givenPairNum);