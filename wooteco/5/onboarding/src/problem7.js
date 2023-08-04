function problem7(user, friends, visitors) {
  const obj = {};
  // 사용자와 함께 아는 친구 점수 계산
  for (let i = 0; i < friends.length; i++) {
    if (friends[i][1] === user || obj[friends[i][1]] === 0) continue;
    if (!obj[friends[i][0]]) obj[friends[i][0]] = 0;
    if (!obj[friends[i][1]]) obj[friends[i][1]] = 10;
    else obj[friends[i][1]] += 10;
  }
  // 사용자의 타임 라인에 방문한 사람 점수 계산
  for (let i = 0; i < visitors.length; i++) {
    if (obj[visitors[i]] === 0) continue;
    if (!obj[visitors[i]]) obj[visitors[i]] = 1;
    else obj[visitors[i]] += 1;
  }
  const strangers = [];
  // 이미 친구인 사람 제거
  for (const [key, value] of Object.entries(obj)) {
    if (value !== 0) strangers.push([key, value]);
  }
  // 점수가 가장 높은 순으로 정렬
  strangers.sort((a, b) => {
    if (b[1] === a[1]) return a[0].localeCompare(b[0]);
    else return b[1] - a[1];
  });
  const answer = [];
  // 최대 5명 반환
  const length = 5 < strangers.length ? 5 : strangers.length;
  for (let i = 0; i < length; i++) {
    answer.push(strangers[i][0]);
  }
  return answer;
}

module.exports = problem7;
