import { input } from "../unsuck.js";

const [r, p] = input("input", "\n\n", "\n"), sc = structuredClone,
    rules = Object.fromEntries(r.map((x, _a, _b) => ([_a, _b] = x.split`{`, [_a, _b.split`,`.map(x => x.split`:`)]))
        .map(([a, b]) => [a, new Function('x', 'rules', [...b.slice(0, -1).map(x => `if (x.${x[0]}) return rules.${x[1]}?.(x,rules);`), `rules.${b.at(-1)[0].slice(0, -1)}?.(x,rules);`].join``)])),
    parts = p.map(x => eval(`(${x.replace(/=/g, ":")})`)), accepted = [],
    rp2 = Object.fromEntries(r.map((x, _a, _b) => ([_a, _b] = x.split(/[{}]/g), [_a, _b.substring(0).split`,`.map(x => x.split`:`)]))),
    cmp = { [-1]: Math.min, 1: Math.max }, dfs = { x: 1, X: 4000, m: 1, M: 4000, a: 1, A: 4000, s: 1, S: 4000 },
    m = { 'a<': ['A', -1, 'a'], 'a>': ['a', 1, 'A'], 'm<': ['M', -1, 'm'], 'm>': ['m', 1, 'M'], 'x<': ['X', -1, 'x'], 'x>': ['x', 1, 'X'], 's<': ['S', -1, 's'], 's>': ['s', 1, 'S'] };


rules.A = (x) => accepted.push(x)
parts.forEach(x => rules.in(x, rules))


function p2(at = 'in', st, w) {
    if (!w) w = []
    if (!st) st = sc(dfs);

    if (at == 'R') return;
    if (at == 'A') return w.push(st)

    for (let r of rp2[at])
        if (r.length == 2) {
            const ns = sc(st), [c, d] = r, n = c.substring(2) - 0, [ch, off, op] = m[c.substring(0, 2)];
            ns[ch] = cmp[off](n + off, ns[ch]), st[op] = cmp[-off](n, st[op])
            p2(d, ns, w)
        } else p2(r[0], sc(st), w)

    return w;
}



console.log(
    accepted.map(x => Object.values(x).sum()).sum(),
    p2().map(({ x, X, m, M, a, A, s, S }) => (X - x + 1) * (M - m + 1) * (A - a + 1) * (S - s + 1)).sum()
)