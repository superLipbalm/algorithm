function solution(orders, course) {
  const answer = [];

  course.forEach((course) => {
    const setMenuMap = new Map();
    orders.forEach((order) => {
      const setMenu = getSetMenu(order, course);

      setMenu.forEach((setMenu) => {
        if (setMenuMap.has(setMenu)) setMenuMap.set(setMenu, setMenuMap.get(setMenu) + 1);
        else setMenuMap.set(setMenu, 1);
      });
    });
    const max = Math.max(...setMenuMap.values());
    if (max < 2) return;
    answer.push(
      ...[...setMenuMap.entries()]
        .filter(([_, count]) => count === max)
        .map(([setMenu, _]) => setMenu)
    );
  });

  return answer.sort();
}

function getSetMenu(order, course) {
  return [
    ...new Set(getCombinations([...order], course).map((setMenu) => setMenu.sort().join(''))),
  ];
}

function getCombinations(array, selectNumber) {
  const results = [];
  if (selectNumber === 1) return array.map((element) => [element]);

  array.forEach((el, index) => {
    const rest = array.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1).map((combination) => [
      el,
      ...combination,
    ]);
    results.push(...combinations);
  });

  return results;
}
