const crypto = require("crypto");

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("base64");
  console.log("salt:", salt);
  crypto.pbkdf2("비밀번호", salt, 1000000, 64, "sha512", (err, key) => {
    key.toString("base64");
  });
});
