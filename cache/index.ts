import { ICacheManager } from './interface/ICache';
import { CacheConfig } from './type';

export default class Cache<T> implements ICacheManager<T> {
    private cacheData: Map<string, T>;
    private expireTime = 0;

    constructor(config?: CacheConfig<T>) {
        const { expireTime = 0, initialMap = new Map<string, T>() } = config || {};
        this.cacheData = new Map<string, T>([...Array.from(initialMap.entries())]);
        this.expireTime = expireTime;
    }

    getCache(uniqueIdKey: string): T | undefined {
        if (this.hasCache(`${uniqueIdKey}`)) {
            return this.cacheData.get(`${uniqueIdKey}`);
        } else {
            return undefined;
        }
    }

    removeCache(uniqueIdKey: string): void {
        this.cacheData.delete(`${uniqueIdKey}`);
    }

    setCache(uniqueIdKey: string, data: T) {
        this.cacheData.set(`${uniqueIdKey}`, data);
    }

    hasCache(uniqueIdKey: string): boolean {
        return this.cacheData.has(`${uniqueIdKey}`);
    }

    clearCache() {
        this.cacheData.clear();
    }
}
