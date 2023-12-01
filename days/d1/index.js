import { input } from "../unsuck.js";
const c = input("input1", "\n"),
    a = {one: "1",two: "2",three: "3",four: "4",five: "5",six: "6",seven: "7",eight: "8",nine: "9"},
    k = Object.keys(a),
    re = (x) => x.split``.reverse().join``,
    [r, r2] = eval(`[/(${k.join`|`}|\\d)/g,/(${k.map(re).join`|`}|\\d)/g]`);

console.log(
    c.map((x) => x.replace(/[a-z]/g, "")).map((x) => x[0] + x.slice(-1) - 0).sum(),
    c.map((x) => [[...x.matchAll(r)][0][0], re([...re(x).matchAll(r2)][0][0])].map((x) => a[x] ?? `${x}`))
     .map((x) => x.sum()).map((x) => x - 0).sum()
);
