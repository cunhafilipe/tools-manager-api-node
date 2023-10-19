import { redisConnectionClient } from "../cache/redis-config";


export class RedisCacheRepository {
  async set(key: string, value: string): Promise<void> {
    const client = await redisConnectionClient()
    await client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    const client = await redisConnectionClient()
    const value = await client.get(key)
    console.log(value)
    return value
  }
}
