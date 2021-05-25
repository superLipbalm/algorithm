function solution(s) {
  var answer = [0, 0];
  let length = 0;

  while (s !== '1') {
    length = s.length;
    s = s.replace(/0/g, '');
    answer[1] += length - s.length;
    s = s.length.toString(2);
    answer[0]++;
  }

  return answer;
}
