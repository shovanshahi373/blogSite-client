import styled, { keyframes } from "styled-components";

export const CardSkeletonStyle = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  width: 200px;
  height: 250px;
  margin: 10px 0;
  background-image: radial-gradient(
      circle 30px at 42% 33%,
      #ddd 55%,
      #ddd 55%,
      transparent 55%
    ),
    linear-gradient(to right, #ddd, #ddd), linear-gradient(to right, #ddd, #ddd),
    linear-gradient(to right, #ddd, #ddd), linear-gradient(to right, #ddd, #ddd),
    linear-gradient(to right, #ddd, #ddd);
  background-repeat: no-repeat;
  background-size: 50px 50px, 76px 9px, 185px 15px, 185px 15px, 185px 15px,
    59px 15px;
  background-position: 3% 10%, 53% 11%, 46% 40%, 46% 50%, 46% 60%, 94% 97%;
`;
