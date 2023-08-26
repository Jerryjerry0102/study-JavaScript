class PasswordStrengthMeter {
  #passwordStrength;
  constructor(passwordStrength) {
    this.#passwordStrength = passwordStrength;
  }
  meter(s) {
    if (s === null || s === "") return this.#passwordStrength.INVALID;
    let metCounts = this.#getMetCriteriaCounts(s);

    if (metCounts <= 1) return this.#passwordStrength.WEAK;
    if (metCounts === 2) return this.#passwordStrength.NORMAL;

    return this.#passwordStrength.STRONG;
  }

  #getMetCriteriaCounts(s) {
    let metCounts = 0;
    if (s.length >= 8) metCounts++;
    if (this.#meetsContainingNumberCreiteria(s)) metCounts++;
    if (this.#meetsContainingUppercaseCreiteria(s)) metCounts++;
    return metCounts;
  }

  #meetsContainingNumberCreiteria(s) {
    for (let i = 0; i < s.length; i++) {
      if ("0" <= s[i] && s[i] <= "9") {
        return true;
      }
    }
    return false;
  }

  #meetsContainingUppercaseCreiteria(s) {
    for (let i = 0; i < s.length; i++) {
      if (65 <= s[i].charCodeAt() && s[i].charCodeAt() <= 90) {
        return true;
      }
    }
    return false;
  }
}

module.exports = PasswordStrengthMeter;
