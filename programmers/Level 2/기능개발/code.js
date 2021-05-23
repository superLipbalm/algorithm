function solution(progresses, speeds) {
  let answer = [];
  let deploy = [];
  let days = 0;

  for (let i = 0; i < progresses.length; i++) {
    days = Math.ceil((100 - progresses[i]) / speeds[i]);

    if (deploy.length !== 0 && deploy[deploy.length - 1] < days) {
      answer.push(deploy.length);
      deploy = [];
    } else if (deploy.length !== 0) {
      days = deploy[deploy.length - 1];
    }

    deploy.push(days);
  }

  answer.push(deploy.length);

  return answer;
}
