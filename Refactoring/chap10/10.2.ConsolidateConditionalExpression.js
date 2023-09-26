// or
function disabilityAmount(anEmployee) {
  if (isNotEligibleForDisability()) return 0;
  //장애 수당 계산

  // 장애 수당 적용 여부 확인
  function isNotEligibleForDisability() {
    return (
      anEmployee.seniority < 2 ||
      anEmployee.monthsDisabled > 12 ||
      anEmployee.isPartTime
    );
  }
}

// and
if (anEmployee.onVacation && anEmployee.seniority > 10) {
  return 1;
}
return 0.5;
