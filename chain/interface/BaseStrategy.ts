export interface BaseStrategy<Data, Result> {
    handle(data: Data): Result | undefined;
}
