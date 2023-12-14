import { input } from "../unsuck.js";

function flip(a) {
    const h = a.length, w = a[0].length;
    return [...Array(w)].map((_, x) => [...Array(h)].map((_, y) => a[y][x]))
}

let p = flip(input("inputt copy", '\n', ''));

let dir = 0;

function move(a) {
    return a.map(x => x.join``.split`#`.map(y => y.split``.sort((a, b) => a == 'O' ? -1 : 1).join``).join`#`.split``)
}

function rotate() {
    p = flip(p).map(x => x.reverse())
    dir++;
    if (dir > 3) dir = 0;
}


function score(x) {
    return x.map(x => x.reduce((p, c, i, a) => p + (c == 'O' ? a.length - i : 0), 0)).sum()
}

console.log(score(move(p)));

const o = {};

for (let i = 0; i < 1000000000; i++) {
    // console.log(p.map(x => x.join('')).join('\n'), '\n')
    rotate();
    p = move(p)
    const s = score(p) * 10 + dir;
    if (s in o) {
        console.log('cycle @', i)
        break;
    }
    o[s] = true;
}

const dirToBe = 1000000000 % 4;

while (dir != dirToBe) {
    rotate();
    p = move(p)
}


console.log(score(p));
