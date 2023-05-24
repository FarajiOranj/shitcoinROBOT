"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_instance_1 = __importDefault(require("./src/bot/bot.instance"));
const common_handlers_1 = require("./src/bot/handlers/common.handlers");
bot_instance_1.default.start(common_handlers_1.menuCB);
bot_instance_1.default.action("start", common_handlers_1.menuCB);
// bot.action('track',); // bot.action('',);
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
bot_instance_1.default.launch();
