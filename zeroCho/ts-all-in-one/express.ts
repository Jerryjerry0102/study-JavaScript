import cookieParser from "cookie-parser";
import express, {
  ErrorRequestHandler,
  NextFunction,
  RequestHandler,
} from "express";
import session from "express-session";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static("./public"));
app.use(cookieParser());
app.use(session({ secret: "SECRET" }));
app.use(passport.initialize());
app.use(passport.session());

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
  req.cookies;

  req.session;
  req.user;
  req.user?.zerocho;
};

app.get("/", middleware);

const errorMiddleware: ErrorRequestHandler = (err: Error, req, res, next) => {
  console.log(err.status);
};
app.use(errorMiddleware);

app.listen(8080, () => {});
