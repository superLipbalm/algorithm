function solution(rows, columns, queries) {
  var answer = [];
  const matrix = [];
  let row = [];
  let moved = [];
  let buffer = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 1; j <= columns; j++) {
      row.push(j + i * columns);
    }
    matrix.push(row);
    row = [];
  }

  queries.forEach((querie) => {
    const [x1, y1, x2, y2] = querie.map((el) => el - 1);
    buffer = matrix[x1 + 1][y1];
    for (let i = y1; i < y2; i++) {
      moved.push(matrix[x1][i]);
      [buffer, matrix[x1][i]] = [matrix[x1][i], buffer];
    }
    for (let i = x1; i < x2; i++) {
      moved.push(matrix[i][y2]);
      [buffer, matrix[i][y2]] = [matrix[i][y2], buffer];
    }
    for (let i = y2; i > y1; i--) {
      moved.push(matrix[x2][i]);
      [buffer, matrix[x2][i]] = [matrix[x2][i], buffer];
    }
    for (let i = x2; i > x1; i--) {
      moved.push(matrix[i][y1]);
      [buffer, matrix[i][y1]] = [matrix[i][y1], buffer];
    }
    answer.push(Math.min(...moved));
    moved = [];
  });

  return answer;
}
