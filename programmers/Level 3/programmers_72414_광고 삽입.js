function solution(play_time, adv_time, logs) {
  const playSec = timeToSec(play_time);
  const advSec = timeToSec(adv_time);
  const plays = new Array(playSec).fill(0);

  logs.forEach((log) => {
    const [start, end] = log.split('-').map((time) => timeToSec(time));
    plays[start] += 1;
    plays[end] -= 1;
  });

  for (let i = 1; i < playSec; i++) {
    plays[i] += plays[i - 1];
  }

  for (let i = 1; i < playSec; i++) {
    plays[i] += plays[i - 1];
  }

  let answer = 0;
  let max = plays[advSec - 1];

  for (let i = advSec; i < playSec; i++) {
    const sum = plays[i] - plays[i - advSec];
    if (sum > max) {
      max = sum;
      answer = i - advSec + 1;
    }
  }

  return secToTime(answer);
}

function timeToSec(time) {
  const [h, m, s] = time.split(':');
  return h * 3600 + m * 60 + +s;
}

function secToTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor(sec / 60) % 60;
  const s = sec % 60;

  return [h, m, s].map((el) => `${el}`.padStart(2, '0')).join(':');
}
