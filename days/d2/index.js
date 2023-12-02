import { input } from "../unsuck.js";
const games = input("input", "\n", ":"), a = {red: 12, green: 13, blue: 14};

console.log(
    games.map((x, i) => [i + 1, x[1].match(/\d+ \w+/g).map((y) => y.split(" "))
                .find((z) => a[z[1]] < z[0] - 0),
    ]).filter(([_, w]) => !w).reduce((p, c) => p + c[0], 0),
    games.map((x, i) =>
        Object.values(x[1].match(/\d+ \w+/g).map((y) => y.split(" "))
            .reduce((p, c) => p[c[1][0]].push(c[0] - 0) && p, {r: [],g: [],b: []})
        ).map((v) => Math.max(...v)).reduce((p, c) => p * c)).sum()
);
