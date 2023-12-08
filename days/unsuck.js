import { readFileSync } from "fs";

function* by(i, n) {
    let c = 0;
    let a = [];
    for (let x of i) {
        a.push(x);
        c++;
        if (c == n) {
            yield a;
            a = [];
            c = 0;
        }
    }
}

function freq(i) {
    const f = {};
    for (let x of i) {
        if (!f[x]) f[x] = 0;
        f[x]++;
    }
    return f;
}

function* map(me, mapper) {
    let i = 0;
    for (let x of me) {
        yield mapper(x, i++);
    }
}
function* filter(i, predicate) {
    for (let x of i) {
        if (predicate(x)) {
            yield x;
        }
    }
}
function find(me, predicate) {
    for (let x of me) {
        if (predicate(x)) {
            return x;
        }
    }
}
function reduce(i, reducer, initial) {
    let acc = initial;
    for (let x of i) {
        acc = reducer(acc, x);
    }
    return acc;
}

function collect(i) {
    return [...i];
}

function sum(i) {
    return reduce(i, (acc, x) => acc + x, 0);
}

function* ____ignoreme() {
    yield 1;
    return;
}

function dbg(me, msg) {
    if (msg) console.log(msg);
    console.log(me);
    return me;
}

function toObject(array, key) {
    const o = {};
    for (const value of array) {
        o[value[key]] = value;
    }
    return o;
}

export function zip(a, b) {
    const result = [];
    const minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++) {
        result.push([a[i], b[i]]);
    }

    return result;
}

const applyToGen = {
    by,
    freq,
    map,
    filter,
    find,
    reduce,
    sum,
    collect,
    toObject,
};

const applyToArr = {
    by,
    freq,
    sum,
    toObject,
    zip,
};

const applyToObject = {
    dbg,
};

Object.entries(applyToGen).forEach(([k, fn]) => {
    ____ignoreme.__proto__.prototype[k] = function (...args) {
        return fn(this, ...args);
    };
});

Object.entries(applyToArr).forEach(([k, fn]) => {
    Object.defineProperty(Array.prototype, k, {
        enumerable: false,
        value: function (...args) {
            return fn(this, ...args);
        }
    })
});

Object.entries(applyToObject).forEach(([k, fn]) => {
    Object.defineProperty(Object.prototype, k, {
        enumerable: false,
        value: function (...args) {
            return fn(this, ...args);
        }
    })
});

function dsplit(str, seperators) {
    if (seperators.length == 0) return str;
    const [sep, ...rest] = seperators;
    return str.split(sep).map((x) => dsplit(x, rest));
}

export function input(path, ...seperators) {
    const fv = readFileSync(path, "utf-8");
    return dsplit(fv, seperators ?? []);
}
