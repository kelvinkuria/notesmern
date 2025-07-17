import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("Upstash Redis environment variables are not set");
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Log if Redis works
redis.ping().then(res => console.log("Redis connection successful:", res))
  .catch(err => console.error("Redis ping failed:", err));

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"), // More generous limits for dev
});

const isDev = process.env.NODE_ENV !== "production";

// ✅ Actual Express middleware
const ratelimiter = async (req, res, next) => {
  if (isDev) return next(); // Skip rate limiting in development

  const identifier = req.ip || "anonymous"; // You can use req.headers['x-forwarded-for'] if behind proxy

  try {
    const { success } = await ratelimit.limit(identifier);
    if (!success) {
      return res.status(429).json({ error: "Too many requests. Please slow down." });
    }
    next();
  } catch (err) {
    console.error("Rate limiting failed:", err);
    res.status(500).json({ error: "Internal rate limiting error" });
  }
};

export default ratelimit;
