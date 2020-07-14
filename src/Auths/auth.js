class Auth {
  constructor() {
    this.isLoggedIn = sessionStorage.getItem("TOKEN") !== null;
  }
  loginStatus() {
    return this.isLoggedIn;
  }

  logIn(token) {
    return new Promise((res, rej) => {
      if (!token || token === null) rej({ msg: "authentication failed" });
      if (this.isLoggedIn) rej({ msg: "already logged in" });
      sessionStorage.setItem("TOKEN", token);
      this.isLoggedIn = true;
      res({ msg: "logged in succesfully" });
    });
  }

  logout() {
    return new Promise((res, rej) => {
      this.isLoggedIn = false;
      sessionStorage.removeItem("TOKEN");
      res();
    });
  }
}

export default Auth;
