import { workerData, parentPort } from "worker_threads";
import WebSocket from "ws";

const sharedData = new Float32Array(workerData);
const socket = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@trade");

socket.on("open", () => {
  console.log("WebSocket connection established.");
});

socket.on("message", (data) => {
  const currentPrice = Number(JSON.parse(data).p);
  if (sharedData[0] !== currentPrice) {
    sharedData[0] = currentPrice;
    parentPort.postMessage(sharedData[0].toFixed(2));
  }
});

// socket.on('close', () => {
//   console.log('WebSocket connection closed.');
// });

// socket.on('error', (error) => {
//   console.error('WebSocket error:', error);
// });