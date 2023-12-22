import { input } from "../unsuck.js";

const p = input('input', '\n').map(x => x.split`~`.map(y => y.split`,`.map(z => z - 0))).sort((a, b) => a[0][2] - b[0][2])

const shapes = [];

function rangesOverlap(range1, range2) {
    return !(range1[1] < range2[0] || range2[1] < range1[0])
}

function rOverlap([[xs1, ys1], [xe1, ye1]], [[xs2, ys2], [xe2, ye2]]) {
    return rangesOverlap([xs1, xe1], [xs2, xe2]) && rangesOverlap([ys1, ye1], [ys2, ye2]);
}


function msd(shape) {
    const [[x, y, z], [X, Y, Z]] = shape;
    if (z == 1) {
        return shapes.push([shape, [], shapes.length])
    } else {
        for (let oz = 0; oz < z; oz++) {
            const zc = z - oz - 1;
            const collisions = [];
            for (let ob of shapes.filter(q => q[0][1][2] == zc)) {
                if (rOverlap(shape, ob[0]))
                    collisions.push(ob[2])
            }

            if (collisions.length > 0) {
                return shapes.push([shape.map(w => (w[2] -= oz, w)), collisions, shapes.length])
            }

            if (z - oz == 1) {
                return shapes.push([shape.map(w => (w[2] -= oz, w)), [], shapes.length])
            }
        }
    }
}

for (let s of p) {
    msd(s);
}

const canremove = shapes.map(x => 1);

shapes.forEach(([, d]) => {
    if (d.length == 1) {
        canremove[d[0]] = 0;
    }
})

let trc = 0;
for (let i in canremove) {
    if (canremove[i]) continue;

    const ban = [i - 0];
    let rc = 0;

    for (let [[, , z], d, c] of shapes) {
        const newSupports = d.filter(x => !ban.includes(x))
        if (newSupports.length == 0 && d.length != 0) {
            rc++;
            ban.push(c);
        }
    }
    trc += rc;
}

console.log(canremove.sum(), trc)
