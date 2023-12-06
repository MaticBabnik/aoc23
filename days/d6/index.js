import { input, zip } from "../unsuck.js";

const { sqrt, ceil, floor } = Math,
    p = input("input", "\n").map((x) => x.split(/:\s+/)[1]),
    p1 = zip(...p.map(x => x.split(/\s+/).map((z) => z - 0))),
    p2 = p.map(x => x.replace(/\s/g, '') - 0),
    f = (a, b, c, _d) => (_d = sqrt(b ** 2 - 4 * a * c), [(-b + _d) / 2 * a, (-b - _d) / 2 * a]),
    w = ([t, d]) => ([t, d] = f(-1, t, -d).sort((a, b) => a - b), ceil(d) - floor(t) - 1)

console.log(p1.map(w).reduce((c, p) => c * p), w(p2));
