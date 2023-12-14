import { input } from "../unsuck.js";

function flip(a) {
    const h = a.length, w = a[0].length;
    return [...Array(w)].map((_, x) => [...Array(h)].map((_, y) => a[y][x]))
}

let p = flip(input("input", '\n', ''));

let dir = 0;

function move(a) {
    return a.map(x => x.join``.split`#`.map(y => y.split``.sort((a, b) => a == 'O' ? -1 : 1).join``).join`#`.split``)
}

function rotate() {
    p = flip(p.map(x => x.reverse()))
    dir++;
    if (dir > 3) dir = 0;
}


function score(x) {
    return x.map(x => x.reduce((p, c, i, a) => p + (c == 'O' ? a.length - i : 0), 0)).sum()
}

// console.log(score(move(p)));

const o = {};

let cy = 0;
let cys = 0;
for (let n = 1; n < 10000; n++) {
    for (let i = 0; i < 4; i++) {
        p = move(p)
        rotate();
    }

    const st = p.map(x => x.join('')).join('')
    const s = score(p);
    // console.log(s)

    p = flip(p)
    // console.log(p.map(x => x.join(' ')).join('\n'), '\n')
    p = flip(p)

    if (st in o) {
        console.log(`cycle`, n, o[st]);
        cy = n - o[st];
        cys = o[st];
        break;
    }
    o[st] = n;
}


const g = (1_000_000_000 - cys) % cy
for (let n = 0; n < g; n++) {
    for (let i = 0; i < 4; i++) {
        p = move(p)
        rotate();
    }
}

console.log(score(p));
