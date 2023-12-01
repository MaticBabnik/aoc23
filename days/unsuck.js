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

function* map(i, mapper) {
    for (let x of i) {
        yield mapper(x);
    }
}
function* filter(i, predicate) {
    for (let x of i) {
        if (predicate(x)) {
            yield x;
        }
    }
}
function* find(i, predicate) {
    for (let x of i) {
        if (predicate(x)) {
            yield x;
            return;
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
    Array.prototype[k] = function (...args) {
        return fn(this, ...args);
    };
});

Object.entries(applyToObject).forEach(([k, fn]) => {
    Object.prototype[k] = function (...args) {
        return fn(this, ...args);
    };
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
