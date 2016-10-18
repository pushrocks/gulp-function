import 'typings-global';
export declare type TExecutionMode = 'forEach' | 'forFirst' | 'atEnd';
export interface IPromiseFunction {
    (file?: any, enc?: any): PromiseLike<any>;
}
