import { BaseStrategy } from './interface/BaseStrategy'; // 如果 Result 为正常值 ，那在execute的时候，执行到匹配到的条件后就会中断。

// 如果 Result 为正常值 ，那在execute的时候，执行到匹配到的条件后就会中断。
// 如果 Result 为void，则这条链就一直执行下去，直到所有的策略都执行完。
export class Chain<Data, Result> {
    private handlerArray: Array<BaseStrategy<Data, Result>> = new Array<
        BaseStrategy<Data, Result>
    >();

    private t: Data | undefined = undefined;

    buildData(t: Data): Chain<Data, Result> {
        this.t = t;
        return this;
    }

    addHandler(handler: BaseStrategy<Data, Result>): Chain<Data, Result> {
        this.handlerArray.push(handler);
        return this;
    }

    addHandlers(handlers: BaseStrategy<Data, Result>[]): Chain<Data, Result> {
        this.handlerArray = handlers;
        return this;
    }

    execute(): Result | undefined {
        let p: Result | undefined;
        this.handlerArray.some((handler: BaseStrategy<Data, Result>) => {
            const result = this.t && handler.handle(this.t);
            if (undefined !== result) {
                p = result;
                return true;
            }
            return result;
        });
        return p;
    }
}
