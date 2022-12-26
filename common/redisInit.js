const redis = require('redis');

// Create a function that creates and returns a new Redis client
const createRedisClient = () => {
  const client = redis.createClient({
    socket:{
        host: 'localhost',
        port: 6379
    }
  });
  return client;
};
// Export the createRedisClient function
module.exports = createRedisClient;