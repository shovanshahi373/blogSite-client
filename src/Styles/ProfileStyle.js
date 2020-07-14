import styled from "styled-components";

const ProfileStyle = styled.div`
& > button.save-changes {
      display: none;
      position: fixed;
      z-index: 9999;
      bottom: 4%;
      right: 6%;
      background-color: var(--green);
      color: white;
      padding: 10px;
      outline: none;
      border-radius: 5px;
      border: none;
      &:hover {
        opacity: 0.8;
      }
    }
  & section.banner {
    min-height: 31vmin;
    font-family: "Block-custom-font";
    margin: -4rem -3rem 0rem;
    transition: background-color 0.2s;
    background-image: ${(props) =>
      props.cover
        ? `url(${props.cover})`
        : `linear-gradient(#aaa,#aaa), linear-gradient(#aaa,#aaa),linear-gradient(#aaa,#aaa),linear-gradient(#aaa,#aaa),linear-gradient(#aaa,#aaa),linear-gradient(#aaa,#aaa),linear-gradient(#aaa,#aaa),linear-gradient(#aaa,#aaa)
      `};
    background-repeat: no-repeat;
    background-size: ${(props) =>
      props.cover ? "cover" : "30px 10px, 10px 30px;"};
    background-position: ${(props) =>
      props.cover
        ? "center"
        : `1% 8%, 1% 10%, 98.9% 8%, 98.9% 10%, 1% 93%, 1% 91%,98.9% 93%, 98.9% 91%;`};
    background-color: #ccc;
    position: relative;
    cursor: pointer;
    & input[type="file"] {
      height: 100%;
      width: 100%;
      position: absolute;
      /* visibility: hidden; */
      opacity: 0;
    }
    &:hover {
      opacity: 0.6;
    }
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: "cover";
      text-transform: uppercase;
      font-size: 30px;
      color: #aaa;
      letter-spacing: 5px;
    }
    & .banner-loading {
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: white;
      z-index: 10;
      overflow: hidden;
      &::after {
        content: "";
        position: absolute;
        background-image: repeating-linear-gradient(
          45deg,
          #aaa 50%,
          transparent 51%
        );
        background-size: 436px 500%;
        background-position: 0% 0%;
        height: 100%;
        width: 100%;
        animation-name: loadingChannel;
        animation-duration: 6s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
    }
  }
  & .info-section {
    height: 65px;
    margin: -65px -3rem;
    position: relative;
    pointer-events: none;
    z-index: 12;
    border-bottom: 3px solid var(--purple);
    & .profile-image {
      height: 75px;
      position: absolute;
      display: inline-block;
      pointer-events: all;
      top: 40%;
      left: 8%;
      cursor: pointer;
      width: 75px;
      border-radius: 50%;
      transform: rotate(45deg);
      /* background-image: ${(props) =>
        props.profile ? `url(${props.profile})` : ""};
      background-size: cover;
      background-position: center; */
      background-color: #ccc;
      border: 3px solid var(--purple);
      border-top-color: #aaa;
      border-bottom-color: #aaa;
      &:hover {
        background-color: #aaa;
      }
      & > .image-container {
        display: inline-block;
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-image: ${(props) =>
          props.profile ? `url(${props.profile})` : ""};
        background-size: cover;
        background-position: center;
        transform: rotate(-45deg);
      }
      & input {
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0;
      }
    }
    & .social-media-links {
      position: absolute;
      bottom: 0;
      right: 0;
      pointer-events: all;
      list-style: none;
      & li {
        display: inline-block;
        padding: 5px;
      }
    }
  }
  & .description {
    height: 50px;
    margin: 5rem -3rem 0;
    font-family: "deftone-cursive-font";
    padding: 0 15px;
    text-align: right;
    & span {
      margin-left: 10px;
    }
  }
`;

export default ProfileStyle;
