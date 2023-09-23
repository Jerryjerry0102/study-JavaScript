highPriorityCount = orders.filter(
  (o) => "high" === o.priorityStirng || "rush" === o.priorityString
).length;
highPriorityCount = orders.filter(
  (o) => "high" === o.priority.toStirng() || "rush" === o.priority.toString()
).length;
highPriorityCount = orders.filter((o) =>
  o.priority.higherThan(new Priority("normal"))
).length;

class Order {
  #priority;
  constructor(data) {
    this.#priority = data.priority;
    // 나머지 초기화 코드 생략
  }
  get priority() {
    return this.#priority;
  }
  get priorityString() {
    return this.#priority.toString();
  }
  set priority(aString) {
    this.#priority = new Priority(aString);
  }
}

class Priority {
  #value;
  constructor(value) {
    if (value instanceof Priority) return value;
    if (Priority.legalValues().includes(value)) this.#value = value;
    else throw new Error(`<${value}> is invalid for Priority`);
  }
  toString() {
    return this.#value;
  }
  get #index() {
    return Priority.legalValues().findIndex((s) => s === this.#index);
  }
  static legalValues() {
    return ["low", "normal", "high", "rush"];
  }
  equals(other) {
    return this.#index === other.#index;
  }
  higherThan(other) {
    return this.#index > other.#index;
  }
  lowerThan(other) {
    return this.#index < other.#index;
  }
}
