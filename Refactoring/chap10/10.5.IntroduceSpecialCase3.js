const temp = {
  name: "애크미 보스턴",
  location: "Malden MA",
  // 더 많은 현장(site) 정보
  customer: {
    name: "애크미 산업",
    billingPlan: "plan-451",
    paymentHistory: {
      weeksDelinquentInLastYear: 0,
      // 중략
    },
    // 중략
  },
};

const temp2 = {
  name: "물류창고 15",
  location: "Malden MA",
  // 더 많은 현장(site) 정보
  customer: "미확인 고객",
};

function enrichSite(aSite) {
  const result = _.cloneDeep(aSite);
  const unknownCustomer = {
    isUnknown: true,
    name: "거주자",
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0,
    },
  };

  if (isUnknown(result.customer)) result.customer = unknownCustomer;
  else result.customer.isUnknown = false;
  return result;
}

function isUnknown(aCustomer) {
  if (aCustomer === "미확인 고객") return true;
  return aCustomer.isUnknown;
}

const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;
// ... 수많은 코드 ...

// 클라이언트 1...
const customerName = aCustomer.name;

// 클라이언트 2
const plan = aCustomer.billingPlan;

// 클라이언트 4
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
