const target = 'AA BB Aa Bb 12';

// 'A' ~ 'Z' 또는 'a' ~ 'z'가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[A-Za-z]+/g;
// const regExp = /[A-Z]+/gi; 도 됨

console.log(target.match(regExp)); // -> ["AA", "BB", "Aa", "Bb"]
