import { Telegraf, Context, MiddlewareFn } from "telegraf";
import { SessionContext } from "telegraf/typings/session";
import Web3 from "web3";
import { backToMenu } from "../layout/layout";
import { invalidAddress } from "../../../public/static/trackUx";


const hasCommonStat = (ctx: SessionContext<any>, next: () => void) => {
    if(ctx.session?.trackSession?.commonStat) next();
    return;
}

const isCompleted = (ctx: SessionContext<any>, next: () => void) => {
    if(!ctx.session.trackSession.completed) next();
    return;
}

const addressCheck = (ctx: Context, next: () => void) => {
    Web3.utils.checkAddressChecksum(ctx.message["text"]) ?
        next() :
        ctx.reply(invalidAddress, backToMenu);
}

const composedAddrMiddleware = Telegraf.compose([hasCommonStat, isCompleted, addressCheck]);

export default composedAddrMiddleware;