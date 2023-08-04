function problem2(cryptogram) {
  const stack = [cryptogram[0]];
  for (let i = 1; i < cryptogram.length; i++) {
    if (stack[stack.length - 1] === cryptogram[i]) stack.pop();
    else stack.push(cryptogram[i]);
  }
  const answer = stack.join("");
  return answer;
}

module.exports = problem2;
