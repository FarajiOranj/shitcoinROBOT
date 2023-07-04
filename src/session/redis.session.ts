import redis from "ioredis";
const redisClient = redis.createClient();

redisClient.connect();
redisClient.on("connect", () => console.log("Connecting to Redis..."));
redisClient.on("error", (err) => console.log("Redis Error: ", err.message));
redisClient.on("connected", () =>
  console.log("Connected to Redis Successfully.")
);
redisClient.on("end", () => console.log("Disconnected from Redis!"));

export default redisClient;