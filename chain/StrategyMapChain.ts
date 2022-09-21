import { StrategyHandler } from './type/Handler';
import { BaseStrategy } from './interface/BaseStrategy';

// 策略链变种，可通过设置Condition枚举=>Strategy的Map作为配置来使用。需要写配置Map，虽然麻烦，但是在复杂的场景下，性能比StrategyChain的要好上一丢丢。
export class StrategyMapChain<Condition, Data, Result> {
    private data: Data | undefined = undefined;
    private strategyMap: Map<Condition, BaseStrategy<StrategyHandler<Condition, Data>, Result>> =
        new Map<Condition, BaseStrategy<StrategyHandler<Condition, Data>, Result>>();

    private condition!: Condition;

    buildCondition(condition: Condition): StrategyMapChain<Condition, Data, Result> {
        if (condition) this.condition = condition;
        return this;
    }

    buildData(data: Data): StrategyMapChain<Condition, Data, Result> {
        if (data) this.data = data;
        return this;
    }

    addStrategies(
        strategiesMap: Map<Condition, BaseStrategy<StrategyHandler<Condition, Data>, Result>>
    ): StrategyMapChain<Condition, Data, Result> {
        if (strategiesMap) {
            const tempStrategiesMap = new Map<
                Condition,
                BaseStrategy<StrategyHandler<Condition, Data>, Result>
            >([...this.strategyMap, ...strategiesMap]);
            this.strategyMap = tempStrategiesMap;
        }
        return this;
    }

    addStrategy(
        condition: Condition,
        strategy: BaseStrategy<StrategyHandler<Condition, Data>, Result>
    ): StrategyMapChain<Condition, Data, Result> {
        if (condition && strategy) {
            this.strategyMap.set(condition, strategy);
        }
        return this;
    }

    execute(): Result | undefined {
        if (this.data) {
            const data: StrategyHandler<Condition, Data> = {
                condition: this.condition,
                strategyData: this.data,
            };
            const handler: BaseStrategy<StrategyHandler<Condition, Data>, Result> | undefined =
                this.strategyMap.get(this.condition);
            if (handler) {
                handler.handle(data);
            }
            return undefined;
        }
        return undefined;
    }
}
