fetch("https://learn.codeit.kr/api/interviews/summer")
  .then((response) => response.text())
  .then((result) => {
    const summer = JSON.parse(result);
    const { interviewees } = summer;
    const newMembers = [];
    for (const interviewee of interviewees) {
      if (interviewee.result === "pass") {
        newMembers.push(interviewee);
      }
    }
    fetch("https://learn.codeit.kr/api/members", {
      method: "POST",
      body: JSON.stringify(newMembers),
    });
  })
  .then(() => fetch("https://learn.codeit.kr/api/members"))
  .then((response) => response.text())
  .then((result) => {
    const members = JSON.parse(result);
    console.log(members);
  });

// 모법 답안
fetch("https://learn.codeit.kr/api/interviews/summer")
  .then((response) => response.json())
  .then((interviewResult) => {
    const { interviewees } = interviewResult;
    const newMembers = interviewees.filter(
      (interviewee) => interviewee.result === "pass"
    );
    return newMembers;
  })
  .then((newMembers) =>
    fetch("https://learn.codeit.kr/api/members", {
      method: "POST",
      body: JSON.stringify(newMembers),
    })
  )
  .then((response) => {
    if (response.status === 200) {
      return fetch("https://learn.codeit.kr/api/members");
    } else {
      throw new Error("New members not added");
    }
  })
  .then((response) => response.json())
  .then((members) => {
    console.log(`총 직원 수: ${members.length}`);
    console.log(members);
  });
