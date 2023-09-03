class AuthService {
  #authKey = "someKey";

  authenticate(id, pw) {
    const authorized = AuthUtil.authorize(this.#authKey);
    if (authorized) {
      return AuthUtil.authenticate(id, pw);
    } else {
      return -1;
    }
  }
}

module.exports = AuthService;
