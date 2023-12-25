import { input } from "../unsuck.js";

function* pairs(r) {
    const l = r.length;
    for (let i = 0; i < l; i++)
        for (let j = i + 1; j < l; j++)
            yield [r[i], r[j]]
}

const p = input('input', '\n', ' @ ', ', ').map(x => x.map(y => y.map(z => z - 0))),
    p1i = p.map(([[x, y], [dx, dy]], _k) => [_k = dy / dx, (y - (_k * x)), x, dx]),
    velx = {}, vely = {}, velz = {},
    MIN = 200000000000000,
    MAX = 400000000000000;

p.forEach(([[px, py, pz], [vx, vy, vz]]) => {
    velx[vx] = [...velx[vx] ?? [], px];
    vely[vy] = [...vely[vy] ?? [], py];
    velz[vz] = [...velz[vz] ?? [], pz];
})

function cross([[k1, n1, x1, s1], [k2, n2, x2, s2]]) {
    const k = k1 - k2, n = n1 - n2, x = -n / k,
        y = k1 * x + n1, dx1 = x - x1, dx2 = x - x2;
    if (Math.min(dx1 / s1, dx2 / s2) < 0) return false
    return x >= MIN && x <= MAX && y >= MIN && y <= MAX;
}

function rockVel(vs) {
    let pv = [...Array(2001)].map((_, i) => -1000 + i);
    Object.keys(vs).forEach((v) => {
        if (vs[v].length < 2) return;
        const np = [];
        pv.forEach((p) => {
            if ((vs[v][0] - vs[v][1]) % (p - v) === 0) {
                np.push(p);
            }
        });
        pv = np;
    })

    return pv[0];
}

console.log(pairs(p1i).map(cross).sum())
console.log(velx, vely, velz)

const rvx = rockVel(velx);
const rvy = rockVel(vely);
const rvz = rockVel(velz);

const rz = {};

for (let [a, b] of pairs(p)) {
    const ma = (a[1][1] - rvy) / (a[1][0] - rvx)
    const mb = (b[1][1] - rvy) / (b[1][0] - rvx)
    const ca = a[0][1] - (ma * a[0][0])
    const cb = b[0][1] - (mb * b[0][0])
    const rpx = parseInt((cb - ca) / (ma - mb))
    const rpy = parseInt(ma * rpx + ca)

    const t = Math.round((rpx - a[0][0]) / (a[1][0] - rvx))
    const rpz = a[0][2] + (a[1][2] - rvz) * t

    const r = rpx + rpy + rpz;
    rz[r] = 1 + rz[r] ?? 0;
}

const result = Object.keys(rz).sort((a, b) => rz[b] - rz[a])[0];

console.log(result);
