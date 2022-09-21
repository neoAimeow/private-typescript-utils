export interface StrategyHandler<Condition, Data> {
    condition: Condition;
    strategyData: Data;
}
