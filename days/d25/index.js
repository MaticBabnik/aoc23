import { input } from "../unsuck.js";

const p = input('input', '\n',/:?\s/g).flatMap(([a,...b])=>b.map(x=>[a,x].sort()));

// console.log(p.map(x=>x.join('->') + ' [dir=both]').join('\n')) // <- spit out graphviz code for graph

function getGraph(cons) {
    let sg = [];

    for (let c of cons) {
        const hasL = sg.find(x=>x.has(c[0]));
        const hasR = sg.find(x=>x.has(c[1]))
        
        if (hasL && hasR) {
            if (hasL == hasR) continue;
            hasR.forEach(x=>hasL.add(x)); // copy all to L
            sg = sg.filter(x=>x!=hasR) // remove R
        } else if (hasL || hasR) {
            hasL?.add(c[1]);
            hasR?.add(c[0]);
        } else {
            sg.push(new Set(c));
        }
    }
    return sg;
}

const ban = ['klk/xgz','bvz/nvf','cbl/vmq'] // just use graphviz lol
console.log(getGraph(p.filter(x=>!ban.includes(x.join`/`))).map(x=>x.size).reduce((p,c)=>p*c))