class Person {
  #name;
  #courses;
  constructor(name) {
    this.#name = name;
    this.#courses = [];
  }
  get name() {
    return this.#name;
  }
  get courses() {
    return [...this.#courses];
  }
  set courses(aList) {
    this.#courses = [...aList];
  }
  addCourse(aCourse) {
    this.#courses.push(aCourse);
  }
  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    }
  ) {
    const index = this.#courses.indexOf(aCourse);
    if (index === -1) fnIfAbsent();
    else this.#courses.splice(index, 1);
  }
}

class Course {
  #name;
  #isAdvanced;
  constructor(name, isAdvanced) {
    this.#name = name;
    this.#isAdvanced = isAdvanced;
  }
  get name() {
    return this.#name;
  }
  get isAdvanced() {
    return this.#isAdvanced;
  }
}

numAdvancedCourses = aPerson.courses.filter((c) => c.isAdvanced).length;

const basicCourseNames = readBasicCourseNames(filename);
aPerson.courses = basicCourseNames.map((name) => new Course(name, false));

for (const name of readBasicCourseNames(filename)) {
  aPerson.addCourse(new Course(name, false));
}
