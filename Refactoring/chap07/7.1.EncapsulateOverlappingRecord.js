import _ from "lodash";

class CustomerData {
  #data;
  constructor(data) {
    this.#data = data;
  }
  get rawData() {
    return _.cloneDeep(this.#data);
  }
  usage(customerID, year, month) {
    return this.#data[customerID].usages[year][month];
  }
  setUsage(customerID, year, month, amount) {
    this.#data[customerID].usages[year][month] = amount;
  }
}

const customerData = new CustomerData({
  1920: {
    name: "마틴 파울러",
    id: "1920",
    usages: {
      2016: {
        1: 50,
        2: 55,
        // 나머지 달(month)는 생략
      },
      2015: {
        1: 70,
        2: 63,
        // 나머지 달은 생략
      },
    },
  },
  38673: {
    name: "닐 포드",
    id: "38673",
    // 다른 고객 정보도 같은 형식으로 저장된다.
  },
});
function getCustomerData() {
  return customerData;
}

function compareUsage(customerID, laterYear, month) {
  const later = getCustomerData().rawData[customerID].usages[laterYear][month];
  const earlier =
    getCustomerData().rawData[customerID].usages[laterYear - 1][month];
  return { laterAmount: later, change: later - earlier };
}
