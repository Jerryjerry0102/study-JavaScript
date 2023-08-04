function problem3(number) {
  let answer = 0;
  for (let i = 1; i <= number; i++) {
    let str = i.toString();
    for (let j = 0; j < str.length; j++) {
      if ([3, 6, 9].includes(+str[j])) answer++;
    }
  }
  return answer;
}

module.exports = problem3;
