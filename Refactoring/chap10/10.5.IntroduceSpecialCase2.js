const { times } = require("lodash");

class Site {
  #customer;

  get customer() {
    return this.#customer === "미확인 고객"
      ? createUnkownCustomer()
      : this.#customer;
  }
}

class Customer {
  get name() {} // 고객 이름
  get billingPlan() {} // 요금제
  set billingPlan(arg) {}
  get paymentHistory() {} // 납부 이력
  get isUnkown() {
    return false;
  }
}

function createUnkownCustomer() {
  return {
    isUnkown: true,
    name: "거주자",
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0,
    },
  };
}

function isUnknown(arg) {
  return arg.isUnknown;
}

const aCustomer = site.customer;
// ... 수많은 코드 ...

// 클라이언트 1
const customerName = aCustomer.name;

// 클라이언트 2
const plan = aCustomer.billingPlan;

// 클라이언트 4
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;

// 튀는 클라이언트
const name = aCustomer.isUnknown ? "미확인 거주자" : aCustomer.name;
