// 처음 통과
// function solution(people, limit) {
//   var answer = 0;
//   const peopleNumber = people.length;
//   let out = 0;

//   people.sort((a, b) => b - a);

//   for (let i = 0; i < people.length - 1; i++) {
//     if (people[i] + people[people.length - 1] <= limit) {
//       out++;
//       people.pop();
//     }
//   }

//   answer = peopleNumber - out;

//   return answer;
// }
// 수정
function solution(people, limit) {
  let out = people.length;
  let lastElementIndex = people.length - 1;

  people.sort((a, b) => b - a);

  for (let i = 0; i < lastElementIndex; i++) {
    if (people[i] + people[lastElementIndex] <= limit) {
      out--;
      lastElementIndex--;
    }
  }

  return out;
}
