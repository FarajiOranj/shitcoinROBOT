import { fork } from "child_process";

const child = fork("forkedPrice.js");

child.send("");

child.on("message", (price) => {
  console.log("The Current ETH/USD is: ", price);
});