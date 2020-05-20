const [i, j] = process.argv.slice(2);
console.log();
console.log(`frame: ${(i - 1) + (j - 1) + ((i - 1) * 6)}`);