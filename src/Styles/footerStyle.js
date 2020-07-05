import styled from "styled-components";

export const Footer = styled.footer`
  min-height: 50vh;
  background-color: var(--purple);
  padding: 3rem 5rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  /* align-items: center; */
  color: #fff;
  & ul {
    list-style: none;
    border-left: 3px solid var(--light-gray);
    padding: 30px;
  }
  & ul li {
    /* padding: 2rem 0; */
  }
`;
