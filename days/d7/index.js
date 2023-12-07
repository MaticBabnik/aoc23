import { input } from "../unsuck.js";

const t = input("input", "\n", ' '), r = '23456789TJQKA', r2 = 'J23456789TQKA',
    score = h => h.sort((a, b, _c) => (_c = a[3] - b[3], _c == 0 ? (a[2] - b[2]) : _c)).reduce((p, c, i) => p + (c[1] - 0) * (i + 1), 0),
    jk = (rc, _t1, _t2) => (_t1 = rc.find(x => x[0] == 'J')?.[1] ?? 0, (_t1 == 0) ? rc : (rc.length == 1 ? [['J', 5]] :
        (_t2 = rc.filter(x => x[0] != 'J'), _t2[0][1] += _t1, _t2)))

console.log([
    t.map(x => [
        ...x, x[0].split('').reverse().reduce((p, c, i) => p + ((10 ** (i * 2)) * r.indexOf(c)), 0),
        Object.values(x[0].split('').freq()).sort((a, b) => b - a).filter(x => x > 1).reduce((p, c, i) => p + c * 10 ** (1 - i), 0)
    ]),
    t.map((x, temp) => [
        ...x, x[0].split('').reverse().reduce((p, c, i) => p + ((10 ** (i * 2)) * r2.indexOf(c)), 0),
        jk(Object.entries(temp = x[0].split('').freq()).sort((a, b) => b[1] - a[1])).filter(x => x[1] > 1).reduce((p, c, i) => p + c[1] * 10 ** (1 - i), 0)
    ])].map(score)
);

