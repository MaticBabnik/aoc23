import { input } from "../unsuck.js";
import { Worker, isMainThread, workerData, parentPort } from "node:worker_threads"
import { fileURLToPath } from "url";
import { cpus } from "os"

const spawnWorker = (workerData) => new Promise(resolve => (new Worker(fileURLToPath(import.meta.url), { workerData })).on('message', resolve)),
    t = (st, sp) => (!st.length) ? (!sp.length ? 1 : 0) : // empty state
        (!sp.length) ? (st.indexOf('#') == -1 ? 1 : 0) :// empty spec
            (st.length < sp.sum() + sp.length - 1) ? 0 : // not enough slots to meet spec
                (st[0] === ".") ? t(st.slice(1), sp) : // .
                    (st[0] === "#") ? (st.slice(0, sp[0]).indexOf('.') !== -1 || st[sp[0]] == '#') ? 0 : t(st.slice(sp[0] + 1), sp.slice(1)) : //#
                        (t("#" + st.slice(1), sp) + t("." + st.slice(1), sp)); // ?



if (isMainThread) {
    const p = input("input", "\n", ' ').map(x => [x[0], x[1].split(',').map(y => y - 0)])
    console.log(
        p.map(([i, s]) => t(i, s)).sum(),
    )

    const p2 = p.map(([i, s]) => [[i, i, i, i, i].join`?`, [s, s, s, s, s].flat()]);
    const PER_THREAD = Math.ceil(p2.length / cpus().length);
    console.log((await Promise.all([...p2.by(PER_THREAD)].map((p) => spawnWorker(p)))).sum())

} else {
    parentPort.postMessage(workerData.map(([i, s]) => t(i, s)).sum())
}