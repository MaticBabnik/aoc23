import { input } from "../unsuck.js";

const eng = input("input", "\n"), r = /[^\d\.]/g, { max, abs } = Math,
    pc = (x) => x && x != ".",
    ns = eng.flatMap((l, y) => [...l.matchAll(/\d+/g)].map((n) => [
        n[0] - 0, n.index, y, n[0].length,
    ])).filter(([, x, y, l]) =>
        pc(eng[y][x - 1]) || pc(eng[y][x + l]) ||
        eng[y + 1]?.substr(max(x - 1, 0), l + 2).match(r) ||
        eng[y - 1]?.substr(max(x - 1, 0), l + 2).match(r)
    ),
    gr = eng.flatMap((l, y) => [...l.matchAll(/\*/g)].map((n) => [n.index, y, Array()]));

ns.forEach(([c, x, y, l]) => gr.filter(([gx, gy]) =>
    abs(gy - y) <= 1 && (abs(x - gx) <= 1 || abs(x + l - 1 - gx) <= 1)
).forEach((g) => g[2].push(c)));

console.log(
    ns.reduce((p, c) => p + c[0], 0),
    gr.filter(([, , x]) => x.length == 2).reduce((p, c) => p + c[2][0] * c[2][1], 0)
);
