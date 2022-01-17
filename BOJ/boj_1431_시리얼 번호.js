const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async function () {
  const input = [];

  for await (const line of rl) {
    input.push(line);
  }
  rl.close();

  const n = +input.shift();
  const isNumber = (char) => char.charCodeAt(0) > 57 || char.charCodeAt(0) < 48;
  const reducer = (acc, cur) => acc + (isNumber(cur) ? 0 : +cur);
  input.sort().sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;

    return [...a].reduce(reducer, 0) - [...b].reduce(reducer, 0);
  });

  console.log(input.join('\n'));

  process.exit();
})();
