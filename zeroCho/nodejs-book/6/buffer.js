const buffer = Buffer.from("저를 버퍼로 바꿔보세요");
console.log(buffer);
console.log(buffer.length);
console.log(buffer.toString());

const array = [
  Buffer.from("띄엄 "),
  Buffer.from("띄엄 "),
  Buffer.from("띄어쓰기"),
];
console.log(Buffer.concat(array).toString());

// 데이터는 없는 빈 버퍼를 만들 때가 있음
console.log(Buffer.alloc(5));
