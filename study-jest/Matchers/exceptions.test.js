function compileAndroidCode() {
  throw new Error("you are using the wrong JDK!");
}

test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // 오류 메시지에 포함되어야 하는 문자열 또는 정규 표현식을 사용할 수 도 있다.
  expect(() => compileAndroidCode()).toThrow("you are using the wrong");
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // 아래와 같은 정규 표현식을 사용하면 정확한 오류 메시지를 일치시킬 수 있다.
  // expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});
