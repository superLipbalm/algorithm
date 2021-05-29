function gcd(a, b) {
  return a % b === 0 ? b : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function solution(arr) {
  // reduce로 더 간단하게 할 수 있음.
  // while(arr.length > 1){
  //     arr.push(lcm(arr.pop(),arr.pop()));
  // }

  return arr.reduce((a, b) => lcm(a, b));
}
