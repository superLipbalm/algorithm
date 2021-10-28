function solution(k, dungeons) {
  let answer = 0;
  const visited = new Array(dungeons.length).fill(false);

  dungeons.forEach((dungeon, idx) => {
    const [n, c] = dungeon;
    if (k >= n) {
      travel([...visited], idx, k - c, 1);
    }
  });

  return answer;

  function travel(v, idx, k, count) {
    v[idx] = true;

    dungeons.forEach((dungeon, i) => {
      const [n, c] = dungeon;
      if (k >= n && !v[i]) {
        travel([...v], i, k - c, count + 1);
      }
    });

    if (count > answer) answer = count;
  }
}
