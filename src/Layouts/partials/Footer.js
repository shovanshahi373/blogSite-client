import React, { useState, useEffect } from "react";
import { Footer } from "../../Styles/footerStyle";

export default () => {
  const [state, setstate] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/`)
      .then((res) => res.json())
      .then((data) => setstate(data.success === true))
      .catch((err) => console.log("cannot connect to the server"));
  }, []);

  return (
    <Footer>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </ul>
      {state && (
        <p
          style={{
            position: "absolute",
            right: "10px",
            bottom: "10px",
          }}
        >
          <span style={{ color: "green", marginRight: "10px" }}>
            <i class="fas fa-circle"></i>
          </span>
          server is running.
        </p>
      )}
    </Footer>
  );
};
