import styled from "styled-components";

export const Header = styled.header`
  min-height: 11vh;
  width: 100vw;
  background-color: limegreen;
  padding: 0rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  & nav {
    align-self: stretch;
  }
  & nav ul {
    display: flex;
    /* grid-template-columns: repeat(3, 1fr); */
    justify-content: center;
    align-items: center;
    list-style: none;
    height: 100%;
  }
  & nav ul li {
    min-width: 70px;
    padding: 0 5px;
    height: inherit;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    color: transparent;
  }
  & nav ul li::before {
    position: absolute;
    color: white;
    content: attr(data-list);
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
  & nav ul li::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    transform-origin: bottom center;
    transform: scaleY(0.09);
    transition: transform 0.2s;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: rebeccapurple;
    pointer-events: none;
  }

  & nav ul li:hover::after {
    transform: scaleY(1);
  }
`;
