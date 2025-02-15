import ICacheProvider from '../models/ICacheProvider'
import cacheConfig from '@config/cache'
import Redis,{ Redis as RedisClientInterface} from 'ioredis'
export default class RedisCacheProvider implements ICacheProvider {

    private client: RedisClientInterface;

    constructor(){

        this.client = new Redis(cacheConfig.config.redis)

    }

    public async save(key:string, value: string) : Promise<void>{
        console.log('IT works !')
        this.client.set(key,JSON.stringify(value))
    }

    public async recover<T>(key:string) : Promise<T | null>{
        const data = await this.client.get(key);

        if(!data){
            return null;
        }

        const parsedData = JSON.parse(data) as T

        return parsedData;
    }


    public async invalidate(key:string) : Promise<void>{
        await this.client.del(key);
    }

    public async invalidatePrefix(prefix:string) : Promise<void>{
        const keys = await this.client.keys(`${prefix}:*`);

        const pipeline = this.client.pipeline()

        keys.forEach(key => {
            pipeline.del(key)
        })

        await pipeline.exec();
    }

}
