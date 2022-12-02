const o = { x: { y: 1 } };
const c1 = { ...o };
console.log(c1);
const c2 = o;
console.log(c2);
console.log(o === c1);
console.log(o === c2);

const p = { x: 1 };
const p1 = p;
const p2 = { ...p };
console.log(p === p1);
console.log(p === p2);
