import { input } from "../unsuck.js";

const p = input("input", "\n", '');

const pipes = {
    '|': [1, 0, 1, 0], //is a vertical pipe connecting north and south.
    '-': [0, 1, 0, 1], //is a horizontal pipe connecting east and west.
    'L': [1, 1, 0, 0], //is a 90-degree bend connecting north and east.
    'J': [1, 0, 0, 1], //is a 90-degree bend connecting north and west.
    '7': [0, 0, 1, 1], //is a 90-degree bend connecting south and west.
    'F': [0, 1, 1, 0], //is a 90-degree bend connecting south and east.
    'S': [1, 1, 1, 1]
}

const bp = Object.fromEntries(Object.entries(pipes).map(([k, v]) => [k, [
    [0, v[0], 0],
    [v[3], 1, v[1]],
    [0, v[2], 0],
]]))

function connectsTo(x1, y1) {
    const p1 = pipes[p[y1][x1]], out = [];
    let i = 0;
    for (let [y, x] of [[-1, 0], [0, 1], [1, 0], [0, -1]]) {
        if (p1?.[i]) {
            const p2 = pipes[p[y1 + y]?.[x1 + x]];
            if (p2?.[(i + 2) % 4]) out.push([y + y1, x + x1]);
        }
        i++;
    }

    return out;
}

function c() {
    const sy = p.findIndex(x => x.includes('S')), sx = p[sy].indexOf('S');

    const map = p.map(x => x.map(y => -1))
    map[sy][sx] = 0;

    let dist = 1, nc;
    do {
        nc = 0;
        map.forEach((yv, cy) => yv.forEach((v, cx) => {
            if (v != dist - 1) return;
            for (let [ny, nx] of connectsTo(cx, cy)) {
                if (map[ny][nx] == -1) {
                    map[ny][nx] = dist;
                    nc++
                }
            }

        }))
        dist++;
    } while (nc > 0);

    const mask = map.map(y => y.map(x => x == -1 ? 0 : 1))//.join('').join('\n');
    const masked = p.map((a, y) => a.map((b, x) => mask[y][x] && b))
    const big = [];
    for (let y = 0; y < p.length; y++) {
        big.push([], [], [])
        for (let x = 0; x < p[0].length; x++) {
            const shape = bp[masked[y][x]] ?? [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            big.at(-3).push(...shape[0])
            big.at(-2).push(...shape[1])
            big.at(-1).push(...shape[2])
        }
    }

    // console.log(big.map(x => x.join('')).join('\n'));

    const w = big[0].length;
    const h = big.length;

    function floodFill(matrix, x, y) {
        const h = matrix.length;
        const w = matrix[0].length;
        const stack = [[x, y]];

        while (stack.length > 0) {
            const [currentX, currentY] = stack.pop();

            if (0 <= currentX && currentX < h && 0 <= currentY && currentY < w && matrix[currentX][currentY] === 0) {
                matrix[currentX][currentY] = 2;

                stack.push([currentX + 1, currentY]);
                stack.push([currentX - 1, currentY]);
                stack.push([currentX, currentY + 1]);
                stack.push([currentX, currentY - 1]);
            }
        }
    }

    function fill() {
        floodFill(big, 0, 0)
        for (let fy = 0; fy < h; fy++) {
            floodFill(big, 0, fy);
            floodFill(big, w - 1, fy);
        }

        for (let fx = 0; fx < w; fx++) {
            floodFill(big, fx, 0);
            floodFill(big, fx, h - 1);
        }

    }

    fill()
    // console.log(big.map(x => x.join('')).join('\n'));

    function count() {
        let c = 0;
        const h = big.length;
        const w = big[0].length;
        for (let y = 1; y < h; y += 3)
            for (let x = 1; x < w; x += 3)
                if (big[y][x] === 0) c++;
        return c;
    }

    return [dist - 2, count()];
}

console.log(c())