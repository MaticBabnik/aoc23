import { input } from "../unsuck.js";

const p = input("input", "\n")
    .map(x => x.split(':')[1].split('|').map(x => x.trim().split(/\s+/g)))
    .map(([h, w]) => (h.filter(t => w.includes(t))).length)

console.log(
    p.map(x => (1 << x >> 1)).sum(),
    p.map(x => 2 ** (x - 1)).sum(),
    p.map(_ => 1).map((c, i, a) =>
        [...Array(p[i])].forEach((_, j) => a[i + 1 + j] += c) || c
    ).sum()
)