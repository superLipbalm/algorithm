function solution(id_list, report, k) {
  const indexMap = Object.fromEntries(id_list.map((id, index) => [id, index]));
  const answer = new Array(id_list.length).fill(0);
  const reports = Object.fromEntries(id_list.map((id) => [id, []]));

  report.forEach((report) => {
    const [from, to] = report.split(' ');
    reports[to].push(from);
  });

  id_list.forEach((id) => {
    reports[id] = [...new Set(reports[id])];
    if (reports[id].length < k) return;
    reports[id].forEach((id) => (answer[indexMap[id]] += 1));
  });

  return answer;
}
