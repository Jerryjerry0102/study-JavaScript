interface Axios {
  get(): void;
}

class CustomError extends Error {
  response?: {
    data: any;
  };
}
declare const axios: Axios;

async () => {
  try {
    await axios.get();
  } catch (err) {
    if (err instanceof CustomError) {
      console.error(err.response?.data);
      err.response?.data;
    }
  }
};
