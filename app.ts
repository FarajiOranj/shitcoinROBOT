import bot from './src/bot/bot.instance';

import './src/bot/commands/common.commands';



// fastify.get('/ws', { websocket: true }, (connection /*, request */) => {
//   connection.socket.on('message', async (message) => {
//     const txHash = message;
//     const response = await axios.post(`https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`, {
//       jsonrpc: '2.0',
//       method: 'eth_getTransactionByHash',
//       params: [txHash],
//       id: 1,
//     });

//     const transaction = response.data.result;
//     if (transaction && transaction.to.toLowerCase() === UNISWAP_ROUTER_ADDRESS.toLowerCase()) {
//       bot.telegram.sendMessage(TELEGRAM_CHAT_ID, `Uniswap swap detected: ${txHash}`);
//     }
//   });
// });



bot.launch();