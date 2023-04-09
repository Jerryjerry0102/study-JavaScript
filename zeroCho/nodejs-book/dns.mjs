import dns from "dns/promises";

// ip 주소를 가져옴
const ip = await dns.lookup("gilbut.co.kr");
console.log("IP", ip);

// ip 주소로 연결하고 싶을 때
const a = await dns.resolve("gilbut.co.kr", "A");
console.log("A", a);

// 메일 서버 설정
const mx = await dns.resolve("gilbut.co.kr", "MX");
console.log("MX", mx);

// www 있는 거랑 없는 거를 연결
const cname = await dns.resolve("www.gilbut.co.kr", "CNAME");
console.log("CNAME", cname);

const any = await dns.resolve("gilbut.co.kr", "ANY");
console.log("ANY", any);
