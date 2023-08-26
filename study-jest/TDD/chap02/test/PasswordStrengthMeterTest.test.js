const PasswordStrengthMeter = require("../main/PasswordStrengthMeter");
const PasswordStrength = require("../main/PasswordStrength");

describe("PasswordStrengthMeterTest", () => {
  const meter = new PasswordStrengthMeter(PasswordStrength);
  const assertStrength = (password, expStr) => {
    const result = meter.meter(password);
    expect(result).toBe(expStr);
  };

  test("입력이 null인 경우 암호 강도는 INVALID", () => {
    assertStrength(null, PasswordStrength.INVALID);
  });

  test("입력이 빈 문자열인 경우 암호 강도는 INVALID", () => {
    assertStrength("", PasswordStrength.INVALID);
  });

  test("암호가 모든 조건을 충족하면 암호 강도는 강함", () => {
    assertStrength("ab12!@AB", PasswordStrength.STRONG);
    assertStrength("abc1!Add", PasswordStrength.STRONG);
  });

  test("길이가 8 미만이고 나머지 조건은 충족하면 암호 강도는 보통", () => {
    assertStrength("ab12!@A", PasswordStrength.NORMAL);
    assertStrength("Ab12!c", PasswordStrength.NORMAL);
  });

  test("숫자를 포함하지 않고 나머지 조건은 충족하면 암호 강도는 보통", () => {
    assertStrength("ab!@ABqwer", PasswordStrength.NORMAL);
  });

  test("대문자를 포함하지 않고 나머지 조건을 충족하면 암호 강도는 보통", () => {
    assertStrength("ab12!@df", PasswordStrength.NORMAL);
  });

  test("길이가 8글자 이상인 조건만 충족하면 암호 강도는 약함", () => {
    assertStrength("abdefghi", PasswordStrength.WEAK);
  });

  test("숫자 포함 조건만 충족하면 암호 강도는 약함", () => {
    assertStrength("12345", PasswordStrength.WEAK);
  });

  test("대문자 포함 조건만 충족하면 암호 강도는 약함", () => {
    assertStrength("ABZEF", PasswordStrength.WEAK);
  });

  test("아무 조건도 충족하지 않으면 암호 강도는 약함", () => {
    assertStrength("abc", PasswordStrength.WEAK);
  });
});
