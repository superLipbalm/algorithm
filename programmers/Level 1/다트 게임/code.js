function solution(dartResult) {
  var answer = [1, 1, 1];
  let answerIndex = 0;

  [...dartResult]
    .map((el, index) => {
      if (el === '1') return dartResult[index + 1] === '0' ? '10' : el;
      else if (el === '0') return dartResult[index - 1] === '1' ? null : el;
      else return el;
    })
    .forEach((el) => {
      if (/\d/.test(el)) {
        answer[answerIndex++] *= el;
      } else if (/[SDT]/.test(el)) {
        let times;
        switch (el) {
          case 'S':
            times = 1;
            break;
          case 'D':
            times = 2;
            break;
          case 'T':
            times = 3;
            break;
        }
        answer[answerIndex - 1] **= times;
      } else {
        switch (el) {
          case '*':
            answer[answerIndex - 1] *= 2;
            answer[answerIndex - 2] *= 2;
            break;
          case '#':
            answer[answerIndex - 1] *= -1;
        }
      }
    });

  return answer.reduce((sum, el) => sum + el);
}
