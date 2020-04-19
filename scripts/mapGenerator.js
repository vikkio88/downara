const { generator } = require('./assets');
const [source, output] = process.argv.slice(2);
const fs = require('fs');

if (!source || !output) {
    console.log(`please specify input and output:`);
    console.log(`   script INPUTFILE OUTPUTFILE`);
    process.exit(0);
}
let map = fs.readFileSync(source);
map = JSON.parse(map);

const parsedMap = generator.mapFromJson(map);

fs.writeFileSync(output, JSON.stringify(parsedMap));

