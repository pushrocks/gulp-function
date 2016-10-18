/// <reference types="node" />
import 'typings-global';
import { Transform } from 'stream';
export declare type TExecutionMode = 'forEach' | 'forFirst' | 'atEnd';
export interface IPromiseFunction {
    (file?: any, enc?: any): PromiseLike<any>;
}
declare let mainExportFunction: (functionsToExecuteArg: IPromiseFunction | IPromiseFunction[], executionModeArg?: TExecutionMode) => Transform;
export default mainExportFunction;
