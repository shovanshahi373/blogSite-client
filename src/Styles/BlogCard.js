import styled from "styled-components";

export const cardShadow = styled.div``;

export const Card = styled.a`
  position: relative;
  padding: 10px;
  border-radius: 5px;
  background-color: #ccc;
  display: flex;
  min-width: 250px;
  flex-direction: column;
  margin-bottom: 10px;
  color: #000;
  text-decoration: none;
  &::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    top: 0;
    border-radius: 5px;
    left: 0;
    transition: all 0.1s;
    pointer-events: none;
    border-bottom: 1px solid var(--purple);
  }
  &:hover::after {
    border-bottom: 5px solid var(--purple);
  }
`;

export const ImageHolderStyle = styled.span`
  height: 30px;
    width: 30px;
    padding: 7px;
    text-align: center;
    border-radius: 50%;
    display: inline-block;
    font-size: 100%;
    font-weight: bolder;
    background-color: #eee;
    margin-right: 10px;
}
`;
