// what if you wanted to go to heaven but got said:
//    "RangeError: Maximum call stack size exceeded"

import { input } from "../unsuck.js";

const map = input('input', '\n', ''), startPos = [1, 0], endPos = [map[0].length - 2, map.length - 1],
    dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]], dirsMap = { '>': 0, 'v': 1, '<': 2, '^': 3 },
    hash = p => p[0] + '_' + p[1], add = (a, b) => a.map((v, c) => v + b[c]),
    valid = p => map[p[1]] && map[p[1]][p[0]] && map[p[1]][p[0]] !== '#',
    sc = structuredClone;

function graph() {
    const st = [{ p: sc(startPos), steps: 0, lId: 0, tj: 0 }], nd = [{ p: [1, 0], to: [] }], seen = {};

    function conNode(c) {
        let nId = nd.findIndex(n => n.p[0] == c.p[0] && n.p[1] == c.p[1]);
        if (nId == c.lId) return nId;
        if (nId == -1) nId = nd.push({ p: sc(c.p), to: [] }) - 1;
        if (nd[c.lId].to.findIndex(cn => cn.id == nId) == -1) nd[c.lId].to.push({ id: nId, dist: c.steps - c.tj })
        if (nd[nId].to.findIndex(cn => cn.id == c.lId) == -1) nd[nId].to.push({ id: c.lId, dist: c.steps - c.tj })
        return nId;
    }

    while (st.length) {
        const cur = st.pop(), k = hash(cur.p), moves = dirs.map(d => add(cur.p, d)).filter(valid);
        if (moves.length > 2) (cur.lId = conNode(cur), cur.tj = cur.steps)
        if (seen[k]) continue; seen[k] = 1;

        if (cur.p[0] == endPos[0] && cur.p[1] == endPos[1]) {
            conNode(cur);
            continue;
        }

        moves.forEach(np => st.push({ p: np, steps: cur.steps + 1, lId: cur.lId, tj: cur.tj, }))
    }

    return nd;
}

function p1() {
    function getMoves(c) {
        const mov = [], v = map[c.p[1]][c.p[0]];
        if (dirsMap[v] >= 0) mov.push(add(c.p, dirs[dirsMap[v]]));
        else dirs.forEach(d => mov.push(add(c.p, d)));
        return mov.filter(p => valid(p) && !c.seen[hash(p)])
    }
    let st = [{ p: sc(startPos), s: 0, seen: {} }], max = 0;

    while (st.length) {
        const cur = st.pop(), k = hash(cur.p);
        cur.seen[k] = 1;

        let moves = getMoves(cur);

        while (moves.length == 1) {
            cur.seen[hash(moves[0])] = 1;
            cur.s++;
            cur.p = moves[0];
            moves = getMoves(cur);
        }

        if (cur.p[0] == endPos[0] && cur.p[1] == endPos[1])
            max = Math.max(max, cur.s);
        else
            moves.forEach(np => st.push({ p: np, s: cur.s + 1, seen: sc(cur.seen) }))
    }

    return max;
}

function p2() {
    let nodes = graph(), stack = [{ p: 0, steps: 0, seen: {} }], end = nodes.length - 1, max = 0;

    while (stack.length) {
        const cur = stack.pop(), k = cur.p;
        cur.seen[k] = 1;

        if (cur.p == end)
            max = Math.max(cur.steps, max);
        else
            nodes[k].to.filter(n => cur.seen[n.id] === undefined).forEach(n => stack.push({ p: n.id, steps: cur.steps + n.dist, seen: sc(cur.seen) }))
    }

    return max;
}


console.log(p1(), p2());

