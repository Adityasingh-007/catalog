const fs = require('fs');

const input = JSON.parse(fs.readFileSync('./input.json', 'utf8'));

const n = input.keys.n;
const k = input.keys.k;

const points = decodeValues(input);
points.sort((a, b) => a[0] - b[0]);
const c = lagrangeInterpolation(points, k);
console.log("constant term", c);


function decodeValues(points) {
    let decodedPoints = [];

    for (let key in points) {
        if (key === 'keys') continue;
        const base = parseInt(points[key].base);
        const value = points[key].value;
        const x = parseInt(key);
        const y = parseInt(value, base);
        decodedPoints.push([x, y]);
    }

    return decodedPoints;
}

function lagrangeInterpolation(points, k) {
    let c = 0;

    for (let i = 0; i < k; i++) {
        const [xi, yi] = points[i];
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const [xj, _] = points[j];
                li *= (0 - xj) / (xi - xj);
            }
        }

        c += yi * li;
    }

    return Math.round(c);
}


