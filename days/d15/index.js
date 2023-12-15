import { input } from "../unsuck.js";

let p = input("input", ','),
    hash = s => s.split``.reduce((p, c) => (p + c.charCodeAt(0)) * 17 % 256, 0),
    b = [...Array(256)].map(_ => Array());

p.forEach(l => {
    const [k, o, v] = l.split(/(\-|\=)/g), h = hash(k), c = b[h];

    if (o == '-') b[h] = c.filter(a => a[0] != k)
    else {
        const i = c.findIndex(a => a[0] == k);
        (i == -1) ? c.push([k, v - 0]) : c[i][1] = v - 0;
    }
})

console.log(p.map(hash).sum(), b.flatMap((b, i) => b.map((l, j) => l[1] * (j + 1) * (i + 1))).sum())