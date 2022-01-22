function isPrime(number) {
  if (!number || number === 1) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
}

function solution(n, k) {
  const numbers = n.toString(k).split(/0+/);

  return numbers.filter((number) => isPrime(+number)).length;
}

// 첫 풀이
// function solution(n, k) {
//     let answer = 0;
//     const numbers = n.toString(k).split(/0+/);

//     for(const number of numbers) {
//         if(number === '1' || number === '') continue;
//         let isPrime = true;
//         for(let i = 2; i <= Math.sqrt(+number); i++) {
//             if(+number % i === 0) {
//                 isPrime = false;
//                 break;
//             }
//         }
//         if(isPrime) answer++;
//     }

//     return answer;
// }
