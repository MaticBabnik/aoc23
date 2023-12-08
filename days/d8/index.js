import { input } from "../unsuck.js";

const [is, mm] = input("input", "\n\n"),
    m = mm.split`\n`.map(x => x.match(/[A-Z0-9]{3}/g)).toObject(0)

function* where() {
    while (true) {
        for (let a of is) {
            yield a;
        }
    }
}

function go(at = 'AAA') {
    let i = 0;
    const aw = at;
    for (let w of where()) {
        at = m[at][w == 'R' ? 2 : 1];
        i++
        if (aw == 'AAA' && at == 'ZZZ' || at.endsWith('Z')) return i;
    }
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Function to calculate the LCM of two numbers
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// Function to calculate the LCM of an array of integers
function calculateLCM(arr) {
    if (arr.length < 2) {
        throw new Error("Array should have at least two integers to calculate LCM.");
    }

    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = lcm(result, arr[i]);
    }

    return result;
}


console.log(go(), calculateLCM(Object.values(m).map(x => x[0]).filter(y => y.endsWith('A')).map(x => go(x))))