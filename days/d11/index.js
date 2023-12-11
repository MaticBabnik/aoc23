import { input } from "../unsuck.js";

function* pairs(r) {
    for (let i = 0; i < r.length; i++)
        for (let j = i + 1; j < r.length; j++)
            yield [r[i], r[j]]
}

let { abs } = Math,
    p = input("input", "\n", ''),
    dist = (a, b) => abs(a[0] - b[0]) + abs(a[1] - b[1]),
    points = p.flatMap((yv, y) => yv.map((v, x) => v == '#' ? [x, y] : undefined).filter(z => z)),
    ex = p[0].map((_, i) => i).filter(a => !points.find(([x]) => x == a)),
    ey = p.map((_, i) => i).filter(a => !points.find(([, y]) => y == a))


console.log(
    pairs(
        points.map(([x, y]) => [x + ex.filter(t => x > t).length, y + ey.filter(t => y > t).length])
    ).map(([a, b]) => dist(a, b)).sum(),
    pairs(
        points.map(([x, y]) => [x + ex.filter(t => x > t).length * 999999, y + ey.filter(t => y > t).length * 999999])
    ).map(([a, b]) => dist(a, b)).sum()
)