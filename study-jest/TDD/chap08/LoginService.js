const AuthService = require("./AuthService");

class LoginService {
  #authService = new AuthService();
  #autoKey = "somekey";
  #customerRepo;

  constructor(customerRepo) {
    this.#customerRepo = customerRepo;
  }

  set authService(authService) {
    this.#authService = authService;
  }

  login(id, pw) {
    const resp = this.#authService.authorize(this.#autoKey);
    if (resp === -1) return LoginResult.badAuthKey();

    if (resp === 1) {
      const c = this.#customerRepo.findOne(id);
      return LoginResult.authenticated(c);
    } else {
      return LoginResult.fail(resp);
    }
  }
}
