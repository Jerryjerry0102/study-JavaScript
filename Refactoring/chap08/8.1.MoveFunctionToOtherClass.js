class Account {
  #daysOverdrawn;

  // 은행 이자 계산
  get bankCharge() {
    let result = 4.5;
    if (this.#daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }

  // 위임 메서드
  get overdraftCharge() {
    return this.type.overdraftCharge(this.daysOverdrawn);
  }
}

class AccountType {
  overdraftCharge(daysOverdrawn) {
    if (this.isPremium) {
      const baseCharge = 10;
      if (daysOverdrawn <= 7) return baseCharge;
      else return baseCharge + (daysOverdrawn - 7) * 0.85;
    } else {
      return daysOverdrawn * 1.75;
    }
  }
}
