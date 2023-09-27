// 생략(중요하지 않은 코드)
checkForMiscreants(people);
// 생략

function checkForMiscreants(people) {
  for (const p of people) {
    if (p === "조거") {
      sendAlert();
      return;
    }
    if (p === "사루만") {
      sendAlert();
      return;
    }
  }
}

function checkForMiscreants(people) {
  if (people.some((p) => ["조커", "사루만"].includes(p))) sendAlert();
}
