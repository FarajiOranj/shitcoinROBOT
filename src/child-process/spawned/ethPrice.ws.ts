import WebSocket from "ws";

const socket = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');

let ethPrice : number;

socket.on('open', () => {
  console.log('WebSocket connection established.');
});

socket.on('message', (data) => {
    const currentPrice = Number(JSON.parse(data).p);
    console.log(currentPrice);

    if(ethPrice !== currentPrice) {
        ethPrice = currentPrice;
        process.stdout.write(ethPrice.toString());
    }
});

// socket.on('close', () => {
//   console.log('WebSocket connection closed.');
// });

// socket.on('error', (error) => {
//   console.error('WebSocket error:', error);
// });