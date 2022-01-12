// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A, K) {
  // write your code in JavaScript (Node.js 8.9.4)
  const result = new Array(A.length);

  for (let i = 0; i < A.length; i++) {
    result[(i + K) % A.length] = A[i];
  }

  return result;
}
