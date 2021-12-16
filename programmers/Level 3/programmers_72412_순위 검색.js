function solution(info, query) {
  let answer = [];
  const infoMap = {};

  info.forEach((info) => {
    info = info.split(' ');
    const keys = getKeys(info.slice(0, -1));
    const score = info[4];
    keys.forEach((key) => {
      if (key in infoMap) infoMap[key].push(+score);
      else infoMap[key] = [+score];
    });
  });

  for (const key in infoMap) {
    infoMap[key].sort((a, b) => a - b);
  }

  query.forEach((query) => {
    query = query.split(' ').filter((el) => el !== 'and');
    const key = query.slice(0, -1).join('');
    if (!(key in infoMap)) {
      answer.push(0);
      return;
    }
    const score = infoMap[key];
    const cutOffScore = +query.slice(-1);
    const index = binarySearch(score, cutOffScore);
    answer.push(index === -1 ? 0 : score.length - index);
  });

  return answer;
}

function binarySearch(array, target) {
  let left = 0;
  let right = array.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const value = array[mid];

    if (value >= target) {
      right = mid;
    } else if (value < target) {
      left = mid + 1;
    }
  }

  return right;
}

function getKeys(info) {
  const keys = [];
  const queue = [[]];

  while (queue.length) {
    const key = queue.shift();

    if (key.length === 4) {
      keys.push(key.join(''));
      continue;
    }

    queue.push([...key, '-']);
    queue.push([...key, info[key.length]]);
  }

  return keys;
}
