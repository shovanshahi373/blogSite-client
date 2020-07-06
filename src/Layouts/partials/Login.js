import React, { useState, useContext, useEffect, useRef } from "react";
import { isEmail } from "../../helpers/validators";
import { MessagesContext } from "../../Contexts/GlobalMessages";
import { LoginContext } from "../../Contexts/loginContext";

const Login = ({ toggleFormFields }) => {
  const { setLoggedIn, setUserData } = useContext(LoginContext);
  const loginRef = useRef();
  const { messages, setMessages } = useContext(MessagesContext);
  const [loading, setLoading] = useState(false);
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    if (loading) {
      loginRef.current.classList.add("loading");
    } else {
      loginRef.current.classList.remove("loading");
    }
  }, [loading]);

  const updateLoginData = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };
  const loginHandler = (e) => {
    e.preventDefault();
    const errors = [];
    const [emailErr, msg] = isEmail(loginUser.email);
    if (emailErr) errors.push({ msg });
    if (!loginUser.password.length)
      errors.push({ msg: "ERROR: please fill the password field!" });
    if (errors.length) {
      return setMessages(errors);
    } else {
      setLoading(true);
      fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginUser.email,
          password: loginUser.password,
          persistToken: remember,
        }),
      })
        .then((res) => {
          if (res.status.toString()[0] === "4") {
            return setMessages([
              { msg: "ERROR: password or email is incorrect!" },
            ]);
          }
          return res.json();
        })
        .then((data) => {
          // login is success, do something with the token
          console.log(data);
          setMessages([{ msg: `SUCCESS: successfully logged in!` }]);
          sessionStorage.setItem("TOKEN", data.token);
          setLoggedIn(true);
          setUserData(data.user);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  };
  return (
    <div className='register-container'>
      <section class='form-info-section'>
        <h3>
          Create an account today and have base access to members only features.
        </h3>
        <p>Register now and join 12,000 others.</p>
        <button onClick={toggleFormFields}>Register</button>
      </section>
      <form>
        <label htmlFor='login-email'>
          <input
            type='text'
            name='email'
            id='login-email'
            required
            onChange={(e) => updateLoginData(e)}
          />
          <span>email</span>
        </label>

        <label htmlFor='login-password'>
          <input
            type='password'
            name='password'
            id='login-password'
            required
            onChange={(e) => updateLoginData(e)}
          />
          <span>password</span>
          {/* <div className='showPassword' title='show password'>
            <i className='fas fa-eye'></i>
          </div> */}
        </label>

        <div
          className='remember-me-box'
          style={{ margin: "10px 0", cursor: "pointer" }}
          onClick={() => setRemember(!remember)}
        >
          {remember ? (
            <i className='fas fa-check-square' />
          ) : (
            <i className='fas fa-square' />
          )}
          {" Remember me"}
        </div>

        <div
          style={{
            marginTop: "10px",
          }}
        >
          {"forgot password? "}
          <span>
            <a
              href='#'
              style={{
                display: "inline-block",
                textDecoration: "underline",
              }}
            >
              Click Here
            </a>
          </span>
          .
        </div>

        <button type='submit' ref={loginRef} onClick={(e) => loginHandler(e)}>
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
