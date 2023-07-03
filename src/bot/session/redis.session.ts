import { Redis } from "@telegraf/session/redis";

const session = Redis({
  url: "redis://127.0.0.1:6379"
});



export default session;
