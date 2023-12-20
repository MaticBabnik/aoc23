import { input } from "../unsuck.js";

const p = input("input", "\n", ' -> ',).map(([x, y]) => [x.replace(/[%&]/g, ''), [y.split`, `, x.startsWith('%') ? '%' : x.startsWith('&') ? '&' : '']]);

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b)), lcm = (a, b) => (a * b) / gcd(a, b);

function do1(p) {
    const map = Object.fromEntries(p);
    const state = Object.fromEntries(p.map(x => [x[0], 0]));
    const conj = Object.fromEntries(p.filter(([k, v]) => v[1] == '&').map(([k]) => [k, Object.fromEntries(p.filter(([n, [h]]) => h.includes(k)).map(([n]) => [n, 0]))]));
    let lo = 0, hi = 0;

    for (let i = 0; i < 1000; i++) {
        let gs = [], q = [['broadcaster', 0, 'btn']];
        lo++;
        while (q.length) {
            for (let [to, s, from] of q) {
                if (!(to in map)) continue;
                if (map[to][1] == '%') {
                    if (s == 0) {
                        state[to] = !state[to] + 0;
                        gs.push(to);
                    }
                } else if (map[to][1] == '&') {
                    conj[to][from] = s;
                    gs.push(to)
                }
                else {
                    state[to] = s;
                    gs.push(to)
                }
            }
            q = [];

            for (let t of gs) {
                if (map[t][1] == '&') {
                    state[t] = Object.values(conj[t]).find(x => x == 0) === 0 ? 1 : 0;
                }

                const sig = map[t][0].map(x => [x, state[t], t]);
                state[t] ? hi += sig.length : lo += sig.length;
                q.push(...sig)
            }
            gs = []
        }
    }

    return lo * hi
}

function do2(p) {
    const map = Object.fromEntries(p),
        state = Object.fromEntries(p.map(x => [x[0], 0])),
        conj = Object.fromEntries(p.filter(([k, v]) => v[1] == '&').map(([k]) => [k, Object.fromEntries(p.filter(([n, [h]]) => h.includes(k)).map(([n]) => [n, 0]))]));

    const rxconj = p.find(([, [x]]) => x.includes('rx'))
    console.assert(rxconj, "no rx con?")
    console.assert(rxconj[1][1] == '&', 'rx con isnt conj');

    const cl = Object.fromEntries(p.filter(([, [x]]) => x.includes(rxconj[0])).map(([y]) => [y, 0]))
    let i = 0;
    while (true) {
        i++;
        let gs = [], q = [['broadcaster', 0, 'btn']];
        while (q.length) {
            for (let [to, s, from] of q) {
                if (!(to in map)) {
                    if (to == 'rx' && s == 0) return i;
                    continue;
                }
                if (map[to][1] == '%') {
                    if (s == 0) {
                        state[to] = !state[to] + 0;
                        gs.push(to);
                    }
                } else if (map[to][1] == '&') {
                    conj[to][from] = s;
                    gs.push(to)
                }
                else {
                    state[to] = s;
                    gs.push(to)
                }
            }
            q = [];

            for (let t of gs) {
                if (map[t][1] == '&') {
                    state[t] = Object.values(conj[t]).find(x => x == 0) === 0 ? 1 : 0;
                }
                if (t in cl) {
                    if (state[t] && !cl[t]) {
                        cl[t] = i;
                        if (Object.values(cl).findIndex(x => x == 0) == -1) {
                            return Object.values(cl);
                        }
                    }
                }
                const sig = map[t][0].map(x => [x, state[t], t]);
                q.push(...sig)
            }
            gs = []
        }
    }

}

console.log(do1(p), 'calculate the LCM of this ->', do2(p))