const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./readme3.txt", { highWaterMark: 16 });
// 압축스트림
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream("./writeme4.txt");
// readStream에서 16바이트씩 읽어서 보내면 writeStream에서도 16바이트씩 받아서 쓴다.
readStream.pipe(zlibStream).pipe(writeStream);
