function solution(cacheSize, cities) {
  var answer = 0;
  const cache = [];
  let cacheIndex = -1;

  // 캐시 크기가 0인 경우
  if (cacheSize === 0) {
    return cities.length * 5;
  }

  cities.forEach((city) => {
    city = city.toLowerCase();
    cacheIndex = cache.indexOf(city);

    if (cacheIndex !== -1) {
      answer += 1;
      cache.splice(cacheIndex, 1);
    } else {
      answer += 5;

      if (cache.length >= cacheSize) {
        cache.shift();
      }
    }

    cache.push(city);
  });

  return answer;
}
