import Redis from "ioredis";

const redisClient = new Redis({
  host: '127.0.0.1',
  port: 6379,
  monitor: true
});

redisClient.connect();

redisClient.on("connecting", () => console.log("Connecting to Redis..."));
redisClient.on("error", (err) => console.log("Redis Error: ", err.message));
redisClient.on("connect", () =>
  console.log("Connected to Redis Successfully.")
);
redisClient.on("end", () => console.log("Disconnected from Redis!"));

export default redisClient;