function solution(n) {
  const answer = [];

  hanoi(n, 1, 2, 3);

  return answer;

  function hanoi(n, from, by, to) {
    if (n === 1) answer.push([from, to]);
    else {
      hanoi(n - 1, from, to, by);
      answer.push([from, to]);
      hanoi(n - 1, by, from, to);
    }
  }
}
