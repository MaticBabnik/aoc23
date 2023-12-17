import { input } from "../unsuck.js";
const d = input('input', '\n', '').map(y => y.map(x => x - 0))

function* neighbors([x, y, v, [dx, dy]], d, p2) {
    if (v < (p2 ? 10 : 3) && d[x + dx]?.[y + dy] !== undefined) {
        yield [[x + dx, y + dy, v + 1, [dx, dy]], d[x + dx][y + dy]];
    }
    for (const [ndx, ndy] of [[dy, -dx], [-dy, dx]]) {
        if (d[x + ndx]?.[y + ndy] !== undefined && (!p2 || v > 3)) {
            yield [[x + ndx, y + ndy, 1, [ndx, ndy]], d[x + ndx][y + ndy]];
        }
    }
}

function go(d, p2) {
    const visited = new Set(),
        s = [[0, 0, 0, [1, 0]], [0, 0, 0, [0, 1]]],
        dist = Object.fromEntries(s.map(x => [x, 0])),
        q = [[0, s[0]], [0, s[1]]],
        end = [d.length - 1, d[0].length - 1];


    while (q.length) {
        const u = q.shift()[1];
        if (visited.has(u.toString())) continue;
        visited.add(u.toString());

        if (u[0] == end[0] && u[1] == end[1] && (!p2 || u[2] > 3)) return dist[u]

        for (const [v, cost] of neighbors(u, d, p2)) {
            if (visited.has(v.toString())) continue;

            const nc = dist[u] + cost;
            if (!dist[v] || nc < dist[v]) {
                dist[v] = nc;

                const ind = q.findIndex(([x]) => nc < (x - 1))
                if (ind == -1) q.push([nc, v])
                else q.splice(ind, 0, [nc, v])
            }
        }
    }
}

console.log(
    go(d, false),
    go(d, true)
)