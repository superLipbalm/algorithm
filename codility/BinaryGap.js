// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(N) {
  // write your code in JavaScript (Node.js 8.9.4)
  const binary = N.toString(2);
  let result = 0;

  for (let i = 0, count = null; i < binary.length; i++) {
    const bit = binary[i];
    if (bit === '1') {
      result = Math.max(result, count);
      count = 0;
    } else if (count !== null) {
      count += 1;
    }
  }

  return result;
}
