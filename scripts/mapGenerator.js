const noise = require('./libs/perlin');
const { generator } = require('./assets');
const [output] = process.argv.slice(2);
const fs = require('fs');
const seed = Math.random();
noise.seed(seed);

const getNoise = (is, js, tiles) => {
    const variety = tiles.length;
    const grid = {};
    for (let i of Array.from(Array(is).keys())) {
        grid[i] = {};
        for (let j of Array.from(Array(js).keys())) {
            const perlin = Math.round(Math.abs(noise.perlin2(i / 10, j / 10) * variety));
            const value = Math.round(Math.abs(noise.simplex2(i, j) * variety));

            console.log(`i: ${i}, j: ${j}   PERLIN: ${perlin}  SIMPLE:  ${value}`);
            grid[i][j] = tiles[perlin] || tiles[0];
        }
    }
    return grid;
};

const grid = getNoise(
    20, 20,
    [
        { t: "grass" },
        { t: "sand" },

        { t: "grass", o: "trees", ov: 1 },

        { t: "grass", o: "mountains", ov: 1, b: 1 },


        { t: "grass", o: "pond", ov: 1, b: 1 },
        { t: "grass", o: "hills", ov: 1 },

        { t: "sand", o: "house", ov: 0 },
        { t: "sand", o: "house", ov: 1 },
        { t: "sand", o: "house", ov: 2 },
        { t: "sand", o: "house", ov: 3 },

        { t: "grass", o: "house", ov: 0 },
        { t: "grass", o: "house", ov: 1 },
        { t: "grass", o: "house", ov: 2 },
        { t: "grass", o: "house", ov: 3 },

        { t: "sand", o: "mansion", ov: 0 },
        { t: "sand", o: "mansion", ov: 1 },
        { t: "sand", o: "mansion", ov: 2 },

        { t: "grass", o: "mansion", ov: 0 },
        { t: "grass", o: "mansion", ov: 1 },
        { t: "grass", o: "mansion", ov: 2 },

    ]
);
fs.writeFileSync(output || './test.json', JSON.stringify(grid, null, 2));