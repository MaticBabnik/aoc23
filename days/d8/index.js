import { input } from "../unsuck.js";

function* loop(t) {
    while (true) {
        for (let a of t) {
            yield a;
        }
    }
}

const [is, mm] = input("input", "\n\n"),
    m = mm.split`\n`.map((x) => x.match(/[A-Z0-9]{3}/g)).toObject(0),
    gcd = (a, b) => (b === 0 ? a : gcd(b, a % b)), lcm = (a, b) => (a * b) / gcd(a, b),
    go = (at = 'AAA') => loop(is).map((x, i) => [at = m[at][x == "R" ? 2 : 1], i + 1]).find(y => y[0].endsWith('Z'))[1]

console.log(
    go(), Object.values(m).filter(x => x[0].endsWith("A")).map(y => go(y[0])).reduce(lcm)
);
