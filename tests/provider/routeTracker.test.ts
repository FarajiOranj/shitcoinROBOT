const fs = require("fs");
import ITxData from "../../public/types/transaction";
import pendingTxTracker from "../../src/provider/pendingTracker";
import whaleAddresses from "../../public/static/trackedAddresses";
import * as dotenv from "dotenv";
dotenv.config();

function createFileCB(TxData: ITxData, comment: string) : boolean {
  fs.writeFile(
    "txHistory.js",
    `${comment}\n${JSON.stringify(TxData)}\n`,
    { flag: "a", encoding: "utf-8" },
    (err) => console.log(err)
  );

  return true;
}

(function fileCreator() {
  pendingTxTracker({
    from: whaleAddresses[0],
    to: process.env.UNI_ROUTE2,
    isPaired: true,
    callback: (txData: ITxData) :boolean => createFileCB(txData,"// new transaction"),
  });
})();


// asserstions, mocha and chai will be added ASAP.