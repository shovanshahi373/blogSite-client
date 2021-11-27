import React from "react";
import "./App.css";
import Blog from "./Components";
import LoginThemeContext from "./Contexts/loginContext";
import ModalThemeContext from "./Contexts/modalContext";
import MessageThemeContext from "./Contexts/GlobalMessages";

function App() {
  return (
    <div className="App">
      <MessageThemeContext>
        <ModalThemeContext>
          <LoginThemeContext>
            <Blog />
          </LoginThemeContext>
        </ModalThemeContext>
      </MessageThemeContext>
    </div>
  );
}

export default App;
