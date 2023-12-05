import { input } from "../unsuck.js";

const p = input("input", "\n\n", "\n");
const maps = p
    .map((x) => x.slice(1).map((y) => y.split(" ").map((z) => z - 0)).sort((a, b) => a[1] - b[1])).slice(1),
    seeds = p[0][0].split(" ").slice(1).map((x) => x - 0),
    res = (n, l) => l.map(([d, s, r]) => n >= s && n <= s + r && n - s + d).find((x) => x !== false) ?? n;


//    ✝ RIP ✝  
//   oneliners  
// day 1 - day 4 
function res2(range, maps) {
    let cur = range[0], to;
    const end = cur + range[1];
    const ranges = [];

    for (let [mD, mS, mR] of maps) {
        if (mS > cur) {
            to = Math.min(mS, end)
            if (to != cur) ranges.push([cur, to - cur])
        } else {
            if (mS + mR < cur) continue;
            to = Math.min(mS + mR, end)
            if (to != cur) ranges.push([cur + mD - mS, to - cur])
        }
        cur = to;
        if (to >= end) return ranges;
    }
    if (cur != end) {
        ranges.push([cur, end - cur]);
    }
    return ranges;
}

console.log(
    maps.reduce((p, c) => p.map((x) => res(x, c)), seeds).sort((a, b) => a - b)[0],
    maps.reduce(
        (p, c) => p.flatMap((x) => res2(x, c)), seeds.by(2).collect()
    ).sort((a, b) => a[0] - b[0])[0][0]
);
