import React, { useState, useContext } from "react";
import { Header as HeaderStyle } from "../../Styles/headerStyle";
// import Link from "next/link";
import ModalStyle from "../../Styles/ModalStyle";
import Register from "./Register";
import Login from "./Login";
import PasswordThemeContext from "../../Contexts/PasswordThemeContext";
// import MessageThemeContext from "../../Contexts/GlobalMessages";
import { LoginContext } from "../../Contexts/loginContext";
import { ModalTheme } from "../../Contexts/modalContext";

export const Header = () => {
  const { loggedIn, setLoggedIn, userData, setUserData, logOut } = useContext(
    LoginContext
  );
  const { registerModal, setRegisterModal } = useContext(ModalTheme);
  // const [register, setRegister] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateUserData = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const logoutPrompt = () => {
    setLogoutModal(!logoutModal);
  };

  const toggleFormFields = () => {
    const form = document.querySelector(".register-container");
    form.classList.toggle("change-order");
  };

  const outsideModalClick = (e) => {
    if (e.target.classList.contains("myModal")) {
      console.log("clicked outside!");
      console.log(e.target.classList);
      setRegisterModal(!registerModal);
    }
  };
  return (
    // <MessageThemeContext>
    <PasswordThemeContext>
      <HeaderStyle>
        <div>logo</div>
        {registerModal ? (
          <ModalStyle
            className='myModal'
            onClick={(e) => {
              outsideModalClick(e);
              // setRegister(!register);
            }}
          >
            <div>
              <Register
                toggleFormFields={toggleFormFields}
                newUser={newUser}
                updateUserData={updateUserData}
              />
              <Login toggleFormFields={toggleFormFields} />
            </div>
          </ModalStyle>
        ) : null}
        <nav>
          <ul>
            <li data-list='home'>
              <a href='/blogs'>Home</a>
            </li>
            {!loggedIn ? (
              <>
                <li
                  data-list='register'
                  onClick={() => setRegisterModal(!registerModal)}
                >
                  Register
                </li>
                <li
                  data-list='login'
                  onClick={() => {
                    setRegisterModal(!registerModal);
                    toggleFormFields();
                  }}
                >
                  Login
                </li>
              </>
            ) : (
              <>
                <li data-list='logout' onClick={() => logoutPrompt()}>
                  Logout
                </li>
                <li data-list='profile'>
                  <a href={`/${userData.name}/profile`}>Profile</a>
                </li>
              </>
            )}
            <li data-list='about'>about</li>
          </ul>
        </nav>
        {loggedIn ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                textTransform: "uppercase",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 5px",
                backgroundImage: userData.avatar
                  ? `url(${userData.avatar})`
                  : "",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                border: "2px solid var(--purple)",
                backgroundColor: "#ccc",
                color: "#000",
                fontWeight: "bolder",
              }}
            >
              {userData.name && userData.name[0]}
            </div>
            <span>{userData.name}</span>
          </div>
        ) : null}
        {logoutModal ? (
          <>
            <ModalStyle
            // className='myModal'
            // onClick={(e) => outsideModalClick(e)}
            >
              <section className='logout-prompt'>
                <p>
                  you are about to log out.
                  <br /> continue?
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <button
                    onClick={() => {
                      logOut();
                      setLogoutModal(!logoutModal);
                    }}
                  >
                    logout
                  </button>
                  <button onClick={() => setLogoutModal(false)}>cancel</button>
                </div>
              </section>
            </ModalStyle>
          </>
        ) : null}
      </HeaderStyle>
    </PasswordThemeContext>
    // </MessageThemeContext>
  );
};
