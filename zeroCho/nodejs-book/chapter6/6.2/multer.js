const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다");
  fs.mkdirSync("uploads");
}

app.get("/uploads/single", (req, res) => {
  res.sendFile(path.join(__dirname, "multipartSingle.html"));
});
app.get("/uploads/array", (req, res) => {
  res.sendFile(path.join(__dirname, "multipartArray.html"));
});
app.get("/uploads/fields", (req, res) => {
  res.sendFile(path.join(__dirname, "multipartFields.html"));
});
app.get("/uploads/none", (req, res) => {
  res.sendFile(path.join(__dirname, "multipartNone.html"));
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// single //
app.post("/upload/single", upload.single("image"), (req, res) => {
  console.log("req.body.title:", req.body.title);
  console.log("req.file:", req.file);
  res.send(req.body.title);
});

// array //
app.post("/upload/array", upload.array("image", 3), (req, res) => {
  console.log("req.body.title:", req.body.title);
  console.log("req.file:", req.files);
  res.send(req.body.title);
});

// fields //
app.post(
  "/upload/fields",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 2 },
    { name: "image3", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("req.body.title:", req.body.title);
    console.log("req.file:", req.files); // req.files.image1, req.files.image2
    res.send(req.body.title);
  }
);

// none //
app.post("/upload/none", upload.none(), (req, res) => {
  console.log("req.body.title:", req.body.title);
  res.send(req.body.title);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
