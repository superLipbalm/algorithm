// https://programmers.co.kr/learn/courses/30/lessons/86491
function solution(sizes) {
  sizes = sizes.map((size) => {
    if (size[1] > size[0]) return size.reverse();
    else return size;
  });

  return Math.max(...sizes.map((size) => size[0])) * Math.max(...sizes.map((size) => size[1]));
}

function solution(sizes) {
  let maxW = 0;
  let maxH = 0;

  sizes.forEach((size) => {
    if (size[1] > size[0]) size.reverse();

    if (size[0] > maxW) maxW = size[0];
    if (size[1] > maxH) maxH = size[1];
  });

  return maxW * maxH;
}
