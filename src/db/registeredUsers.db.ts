const registeredUserIDS: Map<number, string | Array<string>> = new Map(
    [
        [644473251, "0x0"], // Behrouz
        [89192167, "0x0"], // Matin
        [390415311, "0x0"], // Saeed
        [5443857391, "0x0"], // Mohammadreza
        [116185367, "0x0"] // Arash
    ]
);

// type AddrRegExp = RegExp;
// const evmAddrRegex: RegExp = /^(0x)?[0-9a-fA-F]{40}$/i;

// function validateUserAddress(address: string): boolean {
//     return evmAddrRegex.test(address);
// } 

export default registeredUserIDS;