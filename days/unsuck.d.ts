export declare function input(path: string): string;
export declare function input(path: string, ...seperators: []): string;
export declare function input(path: string, ...seperators: [string]): string[];
export declare function input(
    path: string,
    ...seperators: [string, string]
): string[][];
export declare function input(
    path: string,
    ...seperators: [string, string, string]
): string[][][];

declare interface Array<T> {
    by(n: number): Generator<unknown, undefined, T[]>;
    freq(): Record<T, number>;
    toObject<Tkey extends keyof T>(key: Tkey): Record<T[Tkey], T>;
}

declare interface Array<T extends string | number> {
    sum(): T;
}

declare interface Object {
    dbg(msg?: string): this;
}

declare interface Generator<T, TReturn, TNext> {
    by(n: number): Generator<unknown, undefined, TNext[]>;
    map<TOut>(fn: (val: TNext) => TOut): Generator<unknown, undefined, TOut>;
    filter<TOut>(
        fn: (val: TNext) => boolean
    ): Generator<unknown, undefined, TOut>;
    find(fn: (val: TNext) => boolean): TNext;
    reduce<TOut>(fn: (acc: TOut, val: TNext) => TNext, acc: TOut): TOut;
    collect(): TNext[];
    freq(): Record<TNext, number>;
    toObject<Tkey extends keyof TNext>(key: Tkey): Record<TNext[Tkey], TNext>;
}

declare interface Generator<T, TReturn, TNext extends string | number> {
    sum(): TNext;
}
