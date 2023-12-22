import { input } from "../unsuck.js";
const p = input('input', '\n', ''), sy = p.findIndex(x => x.includes('S')), sx = p[sy].indexOf('S'), sz = p.length, DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]],
    w = (x, _y) => (_y = x % sz, _y >= 0 ? _y : _y + sz), f = (m, x, y, n, p2) => [...Array(n)].reduce(p => new Set(JSON.parse(`[${[...p.values()].join`,`}]`)
        .flatMap(([a, b]) => DIRS.map(([c, d]) => [c + a, d + b]).filter(([e, f]) => (p2 || (e >= 0 && f >= 0 && e < sz && f < sz)) && m[w(f)][w(e)] != '#')
            .map(([g, h]) => `[${g},${h}]`))), new Set([`[${x},${y}]`])).size

console.log(f(p, sx, sy, 64), [[0, f(p, sx, sy, sx, 1)], [1, f(p, sx, sy, sx + sz, 1)], [2, f(p, sx, sy, sx + 2 * sz, 1)]],
    '<- desmos regression: y1~ax1^2+bx1+c, then calculate for x=202300 (https://www.desmos.com/calculator/6xepd1bpma)'
)