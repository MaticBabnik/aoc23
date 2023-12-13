import { input } from "../unsuck.js";

const p = input("input", '\n\n', "\n", '');

function flip(a) {
    const h = a.length, w = a[0].length;
    return [...Array(w)].map((_, x) => [...Array(h)].map((_, y) => a[y][x]))
}


function checkSym(a, i) {
    const l = Math.min(a.length - i - 1, i + 1)

    for (let j = 0; j < l; j++) {
        if (a[i - j].join`` != a[i + j + 1].join``) {
            return false
        }
    }

    return true;
}

function checkSym2(a, i) {
    const l = Math.min(a.length - i - 1, i + 1)

    let d = false;

    for (let j = 0; j < l; j++) {
        const w = a[0].length
        for (let k = 0; k < w; k++) {
            if (a[i - j][k] != a[i + j + 1][k]) {
                if (d) return false;
                d = true;
            }
        }
    }

    return d;
}

function check(a, i, c = checkSym) {
    const xs = ([...Array(a.length - 1)].map((_, i) => i).find(x => c(a, x)));
    a = flip(a);
    const ys = ([...Array(a.length - 1)].map((_, i) => i).find(x => c(a, x)));

    // console.log({ xs, ys })

    if (xs !== undefined) return (xs + 1) * 100
    if (ys !== undefined) return ys + 1
    console.log({ i })
    return 0
}

console.log(p.map((x, i) => check(x, i)).sum());
console.log(p.map((x, i) => check(x, i, checkSym2)).sum());

