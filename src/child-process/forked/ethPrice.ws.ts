import WebSocket from "ws";

let upcomingETH_Price : string;

const socket = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');

socket.on('open', () => {
  console.log('WebSocket connection established.');
});

socket.on('message', (data) => {
    const currentPrice = (Number(JSON.parse(data).p)).toFixed(2);
    if(upcomingETH_Price !== currentPrice) {
        upcomingETH_Price = currentPrice;
        process.send(upcomingETH_Price);
    }
});

// socket.on('close', () => {
//   console.log('WebSocket connection closed.');
// });

// socket.on('error', (error) => {
//   console.error('WebSocket error:', error);
// });