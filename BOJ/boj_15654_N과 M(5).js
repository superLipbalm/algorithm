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

  const [n, m] = splitToNumber(input[0]);
  const numbers = splitToNumber(input[1]).sort((a, b) => a - b);
  const visited = new Array(n).fill(false);
  const result = [];

  findSequence([], visited);

  console.log(result.join('\n'));

  process.exit();

  function findSequence(sequence, visited) {
    if (sequence.length === m) return result.push(sequence.join(' '));

    for (let i = 0; i < n; i++) {
      if (visited[i]) continue;
      const newVisited = [...visited];
      newVisited[i] = true;
      findSequence([...sequence, numbers[i]], newVisited);
    }
  }
})();

// 순열을 사전 순으로 오름차순 출력하라고 문제에 나와있지만 그냥 숫자 기준 오름차순 출력해야함..
// 사전순 오름차순이면 아래처럼 10000이 2보다 먼저 와야하니 아래와 같이 출력되게 정렬했었음

// > 4 3
// > 10000 1 2 2000
// 1 10000 2
// 1 10000 2000
// 1 2 10000
// 1 2 2000
// 1 2000 10000
// 1 2000 2
// 10000 1 2
// 10000 1 2000
// 10000 2 1
// 10000 2 2000
// 10000 2000 1
// 10000 2000 2
// 2 1 10000
// 2 1 2000
// 2 10000 1
// 2 10000 2000
// 2 2000 1
// 2 2000 10000
// 2000 1 10000
// 2000 1 2
// 2000 10000 1
// 2000 10000 2
// 2000 2 1
// 2000 2 10000

// 그런데 틀렸다기에 아래와 같이 숫자 오름차순으로 정렬되게 했더니 정답처리됨...

// 1 2 2000
// 1 2 10000
// 1 2000 2
// 1 2000 10000
// 1 10000 2
// 1 10000 2000
// 2 1 2000
// 2 1 10000
// 2 2000 1
// 2 2000 10000
// 2 10000 1
// 2 10000 2000
// 2000 1 2
// 2000 1 10000
// 2000 2 1
// 2000 2 10000
// 2000 10000 1
// 2000 10000 2
// 10000 1 2
// 10000 1 2000
// 10000 2 1
// 10000 2 2000
// 10000 2000 1
// 10000 2000 2
