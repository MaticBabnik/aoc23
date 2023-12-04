import { input } from "../unsuck.js";

const inp = input("input", "\n").map(x => x.split(':')[1].split('|').map(x => x.trim().split(/\s+/g)));

console.log(
    inp.map(([h, w]) => (1 << (h.filter(t => w.includes(t))).length) >> 1).sum()
)

const cards = inp.map(([h, w]) => (h.filter(t => w.includes(t))).length);
const c2 = cards.map(x => 1);

for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j <= i + cards[i] && j < cards.length; j++) {
        c2[j] += c2[i];
    }
}
console.log(c2.sum())