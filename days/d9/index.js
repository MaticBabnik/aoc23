import { input } from "../unsuck.js";

const p = input("input", "\n").map(x => x.split(" ").map(y => y - 0)),
    f = (x, _r = [], _s = 0) => (x.reduce((p, c) => (_s += _r.push(c - p), c)), x.at(-1) + (_s == 0 ? 0 : f(_r)))

console.log(p.map(x => f(x)).sum(), p.map(x => f(x.toReversed())).sum())