declare type PairStat = 'unpaired' | 'bothPaired' | 'fromPaired' | 'toPaired';


declare type TxTypes = '0x0' | '0x2';


declare type Input = {
    input: string,
}

declare type Route = {
    from: string,
    to: string,
}

declare type Fiscal = {
    value: number,
    gas: number,
    gasPrice: number,
    maxFeePerGas: number,
    maxPriorityFeePerGas: number,
}

declare type Sign = {
    nonce: number,
    v: string,
    r: string,
    s: string,
}

declare type TxInfo = {
    type: TxTypes,
    accessList?: Array<string> | undefined,
    readonly hash: string,
    readonly transactionIndex?: number | null,
}

declare type BlockInfo = {
    readonly blockHash?: string | null,
    readonly blockNumber?: number | null,
};

declare interface IPendingTrackerFn {
    isPaired?: PairStat,
    from?: string | Array<string>,
    to?: string | Array<string>,
    callback: (TxData?: ITxData, ...args: Array<any>) => unknown | void
}

// declare function pendingTxTracker(queryData:IPendingTrackerFn ) :void;

declare interface ITxData {
    // input :string,
    readonly Input: Input,
    // from :string,
    // to :string,
    readonly Route: Route,
    // value: number,
    // gas :number,
    // gasPrice :number,
    // maxFeePerGas :number,
    // maxPriorityFeePerGas :number,
    readonly Fiscal: Fiscal,
    // nonce :number,
    // v :string,
    // r :string,
    // s :string,
    readonly Sign: Sign,
    // type :TxTypes,
    // accessList? :Array<string>,
    // hash :string,
    // transactionIndex : number | null,
    readonly TxInfo: TxInfo,
    // blockHash :string | null,
    // blockNumber :number | null,
    readonly BlockInfo?: BlockInfo,
}

export default ITxData;
export {
    IPendingTrackerFn,
    TxTypes,
    PairStat,
    Input,
    Route,
    Fiscal,
    Sign,
    TxInfo,
    BlockInfo,
}