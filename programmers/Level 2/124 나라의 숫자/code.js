function solution(n) {
  var answer = '';
  const numbers = ['4', '1', '2'];
  while (n) {
    answer = numbers[n % 3] + answer;
    n = Math.floor((n - 1) / 3);
  }
  return answer;
}
