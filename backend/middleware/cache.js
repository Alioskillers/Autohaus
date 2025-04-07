const Redis = require('ioredis');

const client = new Redis(); // Defaults to 127.0.0.1:6379

// Optional: Listen for Redis connection events
client.on('connect', () => {
  console.log('🔌 Connected to Redis');
});
client.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

/**
 * Middleware to cache responses
 * @param {function} keyGenerator - Function that takes req and returns a unique cache key
 * @param {number} ttl - Time to live in seconds (default: 1800 seconds = 30 minutes)
 */
const cacheMiddleware = (keyGenerator, ttl = 1800) => {
  return async (req, res, next) => {
    const cacheKey = keyGenerator(req);

    try {
      const cachedData = await client.get(cacheKey);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }

      // Wrap res.json to cache response
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        client.set(cacheKey, JSON.stringify(body), 'EX', ttl); // use EX for expiry
        return originalJson(body);
      };

      next();
    } catch (err) {
      console.error('⚠️ Redis cache middleware error:', err);
      next(); // Don't break if Redis fails
    }
  };
};

module.exports = {
  client,
  cacheMiddleware
};