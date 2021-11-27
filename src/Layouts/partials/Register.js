import React, { useState, useContext, useEffect, useRef } from "react";
import { PasswordContext } from "../../Contexts/PasswordThemeContext";
import checkPasswordStrength from "../../helpers/passwordStrength";
import { matchPassword } from "../../helpers/matchPassword";
import { isName, isEmail } from "../../helpers/validators";
import { MessagesContext } from "../../Contexts/GlobalMessages";
// import Messages from "./Messages";

const Register = ({ toggleFormFields, newUser, updateUserData }) => {
  const registerBtnRef = useRef();
  const { strength, setStrength } = useContext(PasswordContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef();
  // const onmouseup = () => {
  //   eyeIconRef.current.type === "text" ?
  //   eyeIconRef.current.type === "password" :
  //   eyeIconRef.current.type === "text"
  // }

  // const onmousedown = ()

  useEffect(() => {
    // const eye = document.querySelector(".showPassword");
    // eye.addEventListener("mousedown", () => {
    //   eye.parentElement.firstElementChild.type = "text";
    // });
    // eye.addEventListener("mouseup", (e) => {
    //   eye.parentElement.firstElementChild.type = "password";
    //   e.stopPropagation();
    // });
    checkPasswordStrength(newUser.password, strength, setStrength);
    matchPassword(newUser.password, newUser.confirmPassword);
    // return () => {
    //   eye.removeEventListener("mousedown", () => {
    //     eye.parentElement.firstElementChild.type = "text";
    //   });
    //   eye.removeEventListener("mouseup", (e) => {
    //     eye.parentElement.firstElementChild.type = "password";
    //     e.stopPropagation();
    //   });
    //   setMessages([]);
    // };
  }, []);

  useEffect(() => {
    if (loading) {
      registerBtnRef.current.classList.add("loading");
    } else {
      registerBtnRef.current.classList.remove("loading");
    }
  }, [loading]);

  const registerHandler = (e) => {
    e.preventDefault();
    let errors = [];
    const [nameErr, nameMsg] = isName(newUser.username);
    const [emailErr, emailMsg] = isEmail(newUser.email);
    if (nameErr) errors.push({ msg: nameMsg });
    if (emailErr) errors.push({ msg: emailMsg });
    if (!newUser.password || newUser.password !== newUser.confirmPassword)
      errors.push({ msg: "ERROR: please match the passwords correctly!" });
    if (errors.length) {
      return setMessages(errors);
    } else {
      setLoading(true);
      fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
        }),
      })
        .then((res) => {
          if (res.status > 400) throw new Error(res.err);
          res.json();
        })
        .then((data) => setMessages([data]))
        .catch((err) => setMessages([{ msg: err.message }]))
        .finally(() => setLoading(false));
    }
  };
  return (
    <>
      {/* {messages.length ? <Messages items={messages} /> : null} */}
      {/* <Messages items={messages} /> */}
      <div className="register-container">
        <form
        // action="/users/register"
        // method="POST"
        // onSubmit={() => registerHandler()}
        >
          <label htmlFor="register-username">
            <input
              value={newUser.username}
              type="text"
              name="username"
              id="register-username"
              required
              onChange={(e) => updateUserData(e)}
            />
            <span>enter a username</span>
          </label>

          <label htmlFor="register-email">
            <input
              value={newUser.email}
              type="email"
              name="email"
              id="register-email"
              required
              onChange={(e) => updateUserData(e)}
            />
            <span>email(eg. example@xyz.com)</span>
          </label>

          <label htmlFor="register-password">
            <input
              value={newUser.password}
              type="password"
              name="password"
              id="register-password"
              required
              ref={passwordRef}
              onChange={(e) => updateUserData(e)}
              onKeyUp={
                () => {
                  checkPasswordStrength(
                    newUser.password,
                    strength,
                    setStrength
                  );
                  matchPassword(newUser.password, newUser.confirmPassword);
                }
                // checkPasswordStrength(newUser.password, strength, setStrength)
              }
            />
            <span>
              password
              <div style={{ display: "none" }}>
                <p>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </p>
                <kbd className="password-meter-remark">very poor</kbd>
              </div>
            </span>
            <div
              className="showPassword"
              title="show password"
              onMouseDown={() => (passwordRef.current.type = "text")}
              onMouseUp={() => (passwordRef.current.type = "password")}
            >
              <i className="fas fa-eye"></i>
            </div>
          </label>

          <label htmlFor="register-confirm-password">
            <input
              type="password"
              id="register-confirm-password"
              name="confirmPassword"
              value={newUser.confirmPassword}
              required
              onChange={(e) => updateUserData(e)}
              onKeyUp={() =>
                matchPassword(newUser.password, newUser.confirmPassword)
              }
            />
            <span>confirm password</span>
            <div className="confirm-password-state">
              {/* <i class='far fa-check-circle'></i> */}
              {/* <i class='far'></i> */}
              <i
                className="far fa-times-circle"
                style={{
                  color:
                    newUser.password === newUser.confirmPassword
                      ? "var(--green)"
                      : "var(--red)",
                }}
                title={
                  newUser.password === newUser.confirmPassword
                    ? "matched"
                    : "not matched"
                }
              ></i>
            </div>
          </label>

          <p
            style={{
              // textAlign: "center",
              margin: "25px 0 0",
            }}
          >
            Already a member?
            <a
              // href={"/"}
              style={{
                textDecoration: "underline",
              }}
            >
              <span>Login </span>
            </a>
            now.
          </p>

          <button
            ref={registerBtnRef}
            type="submit"
            onClick={(e) => registerHandler(e)}
          >
            Register
          </button>
        </form>
        <section className="form-info-section">
          <h3>Already have an account?</h3>
          <button onClick={toggleFormFields}>Login</button>
        </section>
      </div>
    </>
  );
};

export default Register;
