function solution(n, info) {
  // 동점은 패배기 때문에 1부터... 처음에 0으로 해서 테케 1개 통과 안됨 ㅠㅠ
  let max = 1;
  let result = [-1];

  for (let i = 0; i < 10; i++) {
    dfs(i, n, new Array(11).fill(0), new Array(10).fill(false), 0, 0);
  }

  return result;

  function dfs(index, remainArrows, shots, visited, score, apeachScore) {
    visited[index] = true;
    const requiredArrows = info[index] + 1;
    if (remainArrows >= requiredArrows) {
      remainArrows -= requiredArrows;
      shots[index] = requiredArrows;
      score += 10 - index;
    } else if (requiredArrows > 1) {
      apeachScore += 10 - index;
    }

    if (visited.every((el) => el === true)) {
      if (remainArrows) shots[10] += remainArrows;
      const diff = score - apeachScore;
      // 점수차가 같은 경우 높은 점수부터 탐색하므로 늦게 탐색한 쪽이 낮은 점수를 더 많이 쏜 것
      // 따라서 그냥 덮어써주면 됨
      if (diff >= max) {
        max = diff;
        result = [...shots];
        return;
      }
    }

    visited.forEach((isVisited, index) => {
      if (isVisited) return;
      dfs(index, remainArrows, [...shots], [...visited], score, apeachScore);
    });
  }
}
