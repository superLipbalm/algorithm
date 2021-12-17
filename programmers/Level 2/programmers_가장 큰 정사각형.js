function solution(board) {
  let answer = 0;
  const [boardX, boardY] = [board[0].length, board.length];

  if (boardX === 1 || boardY === 1) return 1;

  for (let y = 1; y < boardY; y++) {
    for (let x = 1; x < boardX; x++) {
      if (board[y][x] === 0) continue;
      const left = board[y][x - 1];
      const up = board[y - 1][x];
      const cross = board[y - 1][x - 1];
      board[y][x] = Math.min(left, up, cross) + 1;
      answer = Math.max(answer, board[y][x]);
    }
  }

  return answer ** 2;
}
