import { input } from "../unsuck.js";

const p = input("input", "\n").map(x => x.split(" ").map(y => y - 0));

function p1(x) {
    const r = [];
    let sum = 0;
    x.reduce((p, c) => (sum += r.push(c - p), c))
    if (sum == 0) return [];
    return [x.at(-1), ...p1(r)]
}

console.log(p.map(x => p1(x).sum()).sum(), p.map(x => p1(x.reverse()).sum()).sum())