declare global {
  interface Error {
    status: number;
  }

  namespace Express {
    interface User {
      zerocho: string;
    }
  }
}

export {};
