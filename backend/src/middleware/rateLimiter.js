//rate limiter js
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
const { success, limit, reset, remaining } = await ratelimit.limit("my-rate-limit");

    console.log("Rate limit status:", { success, limit, remaining, reset });

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;