import validateUrl from "../src/client/js/validationChecker";

describe("testing URL validation", () => {
  test("testing validateUrl() function", () => {
    expect(validateUrl).toBeDefined();
  });

  test("validateUrl fail for invalid url", () => {
    expect(validateUrl("duck")).toBeFalsy();
  });
});
