function solution(m, musicinfos) {
  const musics = [];
  m = chordsFormatting(m).join('');

  musicinfos.forEach((infoStr) => {
    let [start, end, name, music] = infoStr.split(',');
    music = chordsFormatting(music);
    const duration = calcDuration(start, end);
    let chords = '';
    for (let i = 0; i < duration; i++) {
      chords += music[i % music.length];
    }
    musics.push({
      name,
      duration,
      chords,
    });
  });

  const result = musics
    .sort((a, b) => b.duration - a.duration)
    .find((music) => music.chords.includes(m));

  return result ? result.name : '(None)';
}

function calcDuration(start, end) {
  const s = start.split(':').map((el) => +el);
  const e = end.split(':').map((el) => +el);

  return Math.abs((e[0] - s[0]) * 60 + (e[1] - s[1]));
}

function chordsFormatting(str) {
  return str.split(/(?=[A-Z])/).map((chord) => (chord[1] === '#' ? '#' + chord[0] + '#' : chord));
}
