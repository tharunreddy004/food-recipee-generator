// import Redis from "ioredis";

// const redis = new Redis(process.env.REDIS_URL ?? "");

// export default redis;


// lib/redis.ts
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default redis;
