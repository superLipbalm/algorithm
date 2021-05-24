function solution(s) {
  const stack = [];

  for (const char of [...s]) {
    if (char === '(') stack.push(char);
    else if (stack.length > 0) stack.pop();
    else {
      stack.push(-1);
      break;
    }
  }

  return stack.length ? false : true;
}
