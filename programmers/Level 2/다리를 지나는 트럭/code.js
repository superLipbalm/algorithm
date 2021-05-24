function solution(bridge_length, weight, truck_weights) {
  var answer = 0;
  const bridge = [];

  while (truck_weights.length !== 0 || bridge.length !== 0) {
    answer++;
    // 다리 위 트럭 이동
    if (bridge.length > 0 && answer - bridge[0][1] === bridge_length) {
      bridge.shift();
    }
    // 다리에 트럭 올림
    if (
      weight - bridge.reduce((acc, cur) => (acc += cur[0]), 0) >=
      truck_weights[0]
    ) {
      bridge.push([truck_weights[0], answer]);
      truck_weights.shift();
    } else if (bridge.length > 0) {
      // 다리가 가득찬 경우 맨 앞 트럭이 다리를 지나는 시간으로 스킵
      answer = bridge_length + bridge[0][1] - 1;
    }
  }

  return answer;
}
