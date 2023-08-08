function fetchData(boolean) {
  if (boolean) return Promise.resolve("peanut butter");
  else return Promise.reject("error");
}

module.exports = fetchData;
