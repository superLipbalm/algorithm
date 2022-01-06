function solution(n) {
  let answer = 0;

  find(0, []);

  return answer;

  function find(row, queens) {
    if (row === n) return answer++;

    for (let col = 0; col < n; col++) {
      if (
        queens.some(
          ([qRow, qCol]) =>
            qRow === row || qCol === col || Math.abs(qRow - row) - Math.abs(qCol - col) === 0
        )
      )
        continue;
      find(row + 1, [...queens, [row, col]]);
    }
  }
}
