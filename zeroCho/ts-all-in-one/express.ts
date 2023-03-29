import express, { NextFunction, RequestHandler } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static("./public"));

declare global {
  namespace Express {
    export interface Response {
      zerocho: "god";
    }
    export interface Request {
      zerocho: "god";
    }
  }
}

// 미들웨어는 RequestHandler 타입이다.
const middleware: RequestHandler<
  { paramType: string },
  { message: string },
  { bodyType: number },
  { queryType: boolean },
  { localType: unknown }
> = (req, res, next) => {
  req.params.paramType;
  req.body.bodyType;
  req.query.queryType;
  res.locals.localType;
  res.json({
    message: "hello",
  });
  req.zerocho;
};

app.get(
  "/",
  (req, res) => {},
  (req, res) => {},
  (req, res) => {}
);

app.listen(8080, () => {});
