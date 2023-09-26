// 3항 연산자
charge = summer() ? summerCharge() : regularCharge();

// if문
if (summer()) {
  charge = summerCharge();
} else {
  charge = regularCharge();
}

function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

function summerCharge() {
  return quantity * plan.summerRate;
}

function regularCharge() {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}
