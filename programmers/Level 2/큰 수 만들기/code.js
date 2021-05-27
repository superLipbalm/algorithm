function solution(number, k) {
  var answer = [];
  let isRemove = false;

  for (let i = 0; i < number.length; i++) {
    if (k === 0) {
      answer.push(number.slice(i));
      break;
    }

    if (answer.length === 0) {
      answer.push(number[i]);
    } else {
      while (+answer[answer.length - 1] < +number[i] && k !== 0) {
        answer.pop();
        k--;
      }
      answer.push(number[i]);
    }
  }

  return answer.join('').substring(0, answer.length + 1 - k);
}
