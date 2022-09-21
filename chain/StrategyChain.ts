import { StrategyHandler } from './type/Handler';
import { Chain } from './Chain';
import { BaseStrategy } from './interface/BaseStrategy';

export class StrategyChain<Condition, Data, Result> {
    private data: Data | undefined = undefined;
    private chain: Chain<StrategyHandler<Condition, Data>, Result> = new Chain<
        StrategyHandler<Condition, Data>,
        Result
    >();
    private condition!: Condition;

    buildCondition(condition: Condition): StrategyChain<Condition, Data, Result> {
        if (condition) this.condition = condition;
        return this;
    }

    buildData(data: Data): StrategyChain<Condition, Data, Result> {
        if (data) this.data = data;
        return this;
    }

    addStrategies(
        strategies: BaseStrategy<StrategyHandler<Condition, Data>, Result>[]
    ): StrategyChain<Condition, Data, Result> {
        if (strategies) this.chain.addHandlers(strategies);
        return this;
    }

    addStrategy(
        strategy: BaseStrategy<StrategyHandler<Condition, Data>, Result>
    ): StrategyChain<Condition, Data, Result> {
        if (strategy) this.chain.addHandler(strategy);
        return this;
    }

    execute(): Result | undefined {
        if (this.data) {
            const data: StrategyHandler<Condition, Data> = {
                condition: this.condition,
                strategyData: this.data,
            };
            return this.chain.buildData(data).execute();
        }
        return undefined;
    }
}
