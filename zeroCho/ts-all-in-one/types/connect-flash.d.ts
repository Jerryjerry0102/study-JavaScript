// declare module은 파일 안에 import 혹은 export가 하나는 들어가야 한다.
declare module "connect-flash" {
  global {
    namespace Express {
      interface Request {
        flash(message: string): void;
        flash(event: string, message: string): void;
        flash(): { [key: string]: string[] };
      }
    }
  }

  import express from "express";
  function flash(): express.RequestHandler;
  export default flash;
}
