const arr = [1, 2, 3];

// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소 수)
// arr[1]부터 1개의 요소를 제거
arr.splice(1, 1);
console.log(arr); // [1, 3]

// length 프로퍼티가 자동 갱신된다.
console.log(arr.length); // 2

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr2.splice(3, 2);
console.log(arr2); // [1, 2, 3, 6, 7, 8, 9]
