// 가능한 단어 싹 다 만들고 정렬한다음 탐색 ㅎㅎ
// 제일 구림
function solution(word) {
  const chars = ['A', 'E', 'I', 'O', 'U'];
  const dic = [];
  chars.forEach((char) => makeWord(char));
  dic.sort();
  return dic.indexOf(word) + 1;

  function makeWord(word) {
    dic.push(word);

    if (word.length === 5) return;
    else chars.forEach((char) => makeWord(word + char));
  }
}

// 프로그래머스 윤응구님 코드
// 경우의 수 이용해 풀기
// let solution = word => [...word].reduce((a, c, i) => a + "AEIOU".indexOf(c) * ~~(781 / 5 ** i) + 1, 0);

// 프로그래머스 한수빈님 코드
// 완전 탐색으로 풀기
// function solution(word) {
//   const alphas = ['A', 'E', 'I', 'O', 'U'];
//   let isFind = false;
//   let ans = -1;

//   (function f(depth, make) {
//       isFind = make == word;
//       ans++;

//       if (depth == 5 || isFind) return;

//       for (let i = 0; i < 5; i++) {
//           if (isFind) break;

//           f(depth + 1, make + alphas[i]);
//       }
//   })(0, '');

//   return ans;
// }
