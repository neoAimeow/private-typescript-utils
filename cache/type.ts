export type CacheConfig<T> = {
    expireTime?: number;
    initialMap?: Map<string, T>;
};
