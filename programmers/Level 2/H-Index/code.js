function solution(citations) {
  var answer = 0;

  citations.sort((a, b) => b - a);

  while (answer + 1 <= citations[answer]) {
    answer++;
  }

  return answer;
}

function solution2(citations) {
  var answer = 0;

  citations.sort((a, b) => b - a);

  for (const index in citations) {
    if (citations[index] <= +index) {
      answer = +index;
      break;
    }
  }

  if (answer === 0 && citations[citations.length - 1] !== 0) {
    answer = citations.length;
  }

  return answer;
}
