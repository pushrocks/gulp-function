/// <reference types="node" />
import 'typings-global';
import { Transform } from 'stream';
export declare type TExecutionMode = 'forEach' | 'forFirst' | 'atEnd';
export interface IPromiseFunction {
    (file?: any, enc?: any): PromiseLike<any>;
}
declare let defaultExport: (functionsToExecuteArg: IPromiseFunction | IPromiseFunction[], executionModeArg?: TExecutionMode) => Transform;
export declare let forEach: (funcArg: IPromiseFunction) => Transform;
export declare let forFirst: (funcArg: IPromiseFunction) => Transform;
export declare let atEnd: (funcArg: IPromiseFunction) => Transform;
export default defaultExport;
