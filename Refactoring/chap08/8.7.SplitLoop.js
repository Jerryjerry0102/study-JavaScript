return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;

function totalSalary() {
  return people.reduce((total, p) => total + p.salary, 0);
}
function youngestAge() {
  return Math.min(...peole.map((p) => p.age));
}
