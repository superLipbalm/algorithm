function solution(s) {
  var answer = [];
  let set = s
    .slice(2, s.length - 2)
    .split('},{')
    .sort((a, b) => a.length - b.length)
    .map((el) => el.split(','));

  set.forEach((el) => {
    for (let i = 0; i < el.length; i++) {
      if (!answer.includes(+el[i])) {
        answer.push(+el[i]);
        break;
      }
    }
  });

  return answer;
}
