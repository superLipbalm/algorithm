function solution(n, left, right) {
  const answer = [];

  for (let i = left; i <= right; i++) {
    const row = Math.floor(i / n);
    const column = i % n;
    const number = Math.max(row, column) + 1;
    answer.push(number);
  }

  return answer;
}

// 메모리 터짐!
// function solution(n, left, right) {
//     return Array.from({length: n}, () => new Array(n).fill(1))
//     .flatMap((row, y) => row.map((cell, x) => Math.max(x, y) + 1))
//     .slice(left, right + 1);
// }
