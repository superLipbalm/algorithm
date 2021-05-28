function solution(priorities, location) {
  var answer = 0;
  let works = priorities.map((prioritie, index) => [index, prioritie]);

  while (true) {
    if (works.filter((el) => el[1] > works[0][1]).length) {
      works.push(works[0]);
      works.shift();
    } else {
      answer += 1;
      if (works[0][0] === location) break;
      works.shift();
    }
  }

  return answer;
}
