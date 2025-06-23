// upstash.js
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis:redis,
  limiter:Ratelimit.slidingWindow(1, "4 s"),
});

// Test connection (make sure this is in an async context)
try {
  const pong = await redis.ping();
  console.log("Redis connection test:", pong);
} catch (error) {
  console.error("Redis connection failed:", error);
}

export default ratelimit;