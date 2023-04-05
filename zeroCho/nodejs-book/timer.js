const timeoutId = setTimeout(() => {
  console.log("1.5초 후 실행");
}, 1500);

const intervalId = setInterval(() => {
  console.log("1초마다 실행");
}, 1000);

const timeoutId2 = setTimeout(() => {
  console.log("실행되지 않습니다");
}, 3000);

setTimeout(() => {
  clearTimeout(timeoutId2);
  clearInterval(intervalId);
}, 2500);

const immediateId = setImmediate(() => {
  console.log("즉시 실행");
});

const immediateId2 = setImmediate(() => {
  console.log("실행되지 않습니다.");
});

clearImmediate(immediateId2);
