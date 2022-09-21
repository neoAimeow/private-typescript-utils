export interface ICacheManager<T> {
    getCache(uniqueIdKey: string): T | undefined;
    setCache(uniqueIdKey: string, data: T): void;
    removeCache(uniqueIdKey: string): void;
    clearCache(): void;
    hasCache(uniqueIdKey: string): boolean;
}
