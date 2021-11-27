require("dotenv").config();
const HOST = process.env.REACT_APP_SERVER;
console.log({ HOST });

class Auth {
  constructor() {
    this.isLoggedIn = false;
  }

  loginStatus() {
    const token = sessionStorage.getItem("TOKEN");
    console.log(token);
    return new Promise(async (res, rej) => {
      if (token) {
        try {
          const result = await fetch(`${HOST}/users/auth`, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const data = await result.json();
          this.isLoggedIn = data.success && data.success === true;
          console.log("from the class,", this.isLoggedIn);
          return res(data.success && data.success === true);
        } catch (err) {
          return rej(err.message);
        }
      } else {
        return rej("unauthorized!");
      }
    });
  }

  login(userData = {}) {
    return fetch(`${HOST}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
        persistToken: userData.persistToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  logout() {
    return new Promise((res, rej) => {
      const isValid = sessionStorage.getItem("TOKEN") !== null;
      if (isValid) {
        this.isLoggedIn = false;
        sessionStorage.removeItem("TOKEN");
        res(this.isLoggedIn);
      } else {
        rej({ msg: "already logged out!" });
      }
    });
  }
}

export default Auth;
