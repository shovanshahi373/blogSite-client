import React, { useState, useRef } from "react";
import { Header as HeaderStyle } from "../../Styles/headerStyle";
import ModalStyle from "../../Styles/ModalStyle";
import Register from "./Register";
import Login from "./Login";
import PasswordThemeContext from "../../Contexts/PasswordThemeContext";
import MessageThemeContext from "../../Contexts/GlobalMessages";

export const Header = () => {
  const [register, setRegister] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const updateUserData = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const toggleFormFields = () => {
    const form = document.querySelector(".register-container");
    form.classList.toggle("change-order");
  };

  const outsideModalClick = (e) => {
    if (e.target.classList.contains("myModal")) {
      console.log("clicked outside!");
      console.log(e.target.classList);
      setRegister(!register);
    }
  };
  return (
    <MessageThemeContext>
      <PasswordThemeContext>
        <HeaderStyle>
          <div>logo</div>
          {register ? (
            <ModalStyle
              className='myModal'
              onClick={(e) => outsideModalClick(e)}
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
              <li data-list='home'>home</li>
              <li data-list='register' onClick={() => setRegister(!register)}>
                Register
              </li>
              <li data-list='login'>Login</li>
              <li data-list='about'>about</li>
            </ul>
          </nav>
        </HeaderStyle>
      </PasswordThemeContext>
    </MessageThemeContext>
  );
};
