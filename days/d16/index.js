import { input } from "../unsuck.js";

const p = input("input", '\n', ''),
    dirVectors = [[1, 0], [0, 1], [-1, 0], [0, -1]],
    mirrorDirs = { '\\': [1, 0, 3, 2], '/': [3, 2, 1, 0], },
    w = p[0].length, h = p.length, a = [];

function sim(sx, sy, sd) {
    // create 4 empty maps to keep track of beam paths (1 for each direction)
    const e = [...Array(4)].map(_ => p.map(pp => pp.map(_ => 0)));


    const s = (x, y, d) => (e[d][y]) && (x in e[d][y]) && (e[d][y][x] = true);

    function beam(x, y, d) {
        let [dx, dy] = dirVectors[d]

        if (e[d][y]?.[x]) return // kill self immediate (duplicate)

        for (; ; x += dx, y += dy) {
            if (!s(x, y, d)) return; // kill self immediate (out of bounds)

            switch (p[y][x]) {
                case '|':
                    if (d % 2 === 0) return (beam(x, y, 1), beam(x, y, 3), 0)
                    break;
                case '-':
                    if (d % 2 !== 0) return (beam(x, y, 0), beam(x, y, 2), 0)
                    break;
                case '/':
                case '\\':
                    const r = mirrorDirs[p[y][x]][d]
                    return beam(x + dirVectors[r][0], y + dirVectors[r][1], r)
            }
        }
    }
    beam(sx, sy, sd)

    return e.reduce((a, b) => a.map((x, i) => x.map((y, j) => y + b[i][j]))).map(x => x.filter(y => y).length).sum()
}

for (let x = 0; x < w; x++) {
    a.push(sim(x, 0, 1))
    a.push(sim(x, h - 1, 3))
}
for (let y = 0; y < h; y++) {
    a.push(sim(0, y, 0))
    a.push(sim(w - 1, y, 2))
}

console.log(sim(0, 0, 0), Math.max(...a))