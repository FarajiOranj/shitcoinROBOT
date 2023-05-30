import ITxData from "../../public/types/transaction";
import pendingTxTracker from "../../src/provider/pendingTracker";
const fs = require("fs");

async function createFileCB(TxData: ITxData, comment: string) {
  console.log("Pasting the text...");
  await fs.writeFile(
    "txHistory.js",
    `${comment}\n${JSON.stringify(TxData)}\n`,
    { flag: "a", encoding: "utf-8" },
    (err) => console.log(err)
  );
  console.log("End of file paste.");
}

(function fileCreator() {
  console.log("Sending request...");
  pendingTxTracker({
    // from: whaleAddresses[0],
    to: process.env.UNI_ROUTE2,
    // isPaired: 'BothPaired',
    callback: (txData: ITxData) => createFileCB(txData, "// new transaction"),
  });
  console.log("Processing on server background");
})();

// asserstions, mocha and chai will be added ASAP.