function solution(n) {
  const numbers = [];

  for (let i = 2; i <= n; i++) {
    numbers.push(i);
  }

  for (let i = 2; i <= n; i++) {
    if (numbers[i - 2] === 0) continue;
    for (let j = 2 * i; j <= n; j += i) {
      numbers[j - 2] = 0;
    }
  }

  return numbers.filter((number) => number !== 0).length;
}
