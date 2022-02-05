const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const splitToNumber = (input) => input.split(' ').map((el) => +el);

(async function () {
  const input = [];

  for await (const line of rl) {
    input.push(line);
  }
  rl.close();

  input.shift();
  const scoreMap = {};
  const result = input
    .map((input) => {
      const [name, korean, english, math] = input.split(' ');
      scoreMap[name] = [+korean, +english, +math];
      return name;
    })
    .sort()
    .sort((a, b) => {
      const [koreanA, englishA, mathA] = scoreMap[a];
      const [koreanB, englishB, mathB] = scoreMap[b];
      const koreanDiff = koreanB - koreanA;
      if (koreanDiff !== 0) return koreanDiff;
      const englishDiff = englishA - englishB;
      if (englishDiff !== 0) return englishDiff;
      const mathDiff = mathB - mathA;
      return mathDiff;
    })
    .join('\n');
  console.log(result);

  process.exit();
})();
