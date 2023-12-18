import { input } from "../unsuck.js";
const p = input('input', '\n', ' '),
    p1 = p.map(([d, l, c]) => [d, l - 0]), p2 = p.map(([, , c]) => eval(`[${c[7]},0x${c.substr(2, 5)}]`)),
    dv = { L: [-1, 0], R: [1, 0], D: [0, 1], U: [0, -1], 2: [-1, 0], 0: [1, 0], 1: [0, 1], 3: [0, -1] }

function shl(p, tl) {
    let area = 0, l = p.length;
    for (let i = 0; i < l - 1; i++)
        area += (p[i][1] + p[i + 1][1]) * (p[i][0] - p[i + 1][0]);
    area += (p[l - 1][1] + p[0][1]) * (p[l - 1][0] - p[0][0]);
    return 1 + (area + tl) / 2;
}

const c = (d, cx = 0, cy = 0) => shl([[0, 0], ...d.map(([d, l]) => [cx += dv[d][0] * (l), cy += dv[d][1] * (l)])], d.map((x) => x[1]).sum())

console.log(c(p1), c(p2))