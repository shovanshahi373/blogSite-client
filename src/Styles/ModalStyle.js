import styled from "styled-components";

const ModalStyle = styled.section`
  position: fixed;
  height: 100vh;
  top: 0;
  color: #ccc;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5rem;
  & > * {
    /* margin: auto;
    border-radius: 5px;
    background-color: var(--purple);
    padding: 10px;
    display: flex;
    flex-direction: column; */
    /* position: relative; */
    /* border-radius: 5px; */
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: grid;
    overflow: hidden;
    max-width: 90%;
    grid-template-columns: repeat(2, 100%);
    grid-auto-rows: 100%;
    /* margin: auto; */
    /* width: 70vw; */
    border-radius: 5px;
  }
  & form {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  & .form-info-section {
    text-align: center;
    position: relative;
    flex: 1;
    display: flex;
    margin: 0 20px;
    flex-direction: column;
    overflow: hidden;
    z-index: 0;
    justify-content: center;
    align-items: center;
  }
  & .form-info-section::before {
    position: absolute;
    content: "";
    height: 100%;
    width: 50%;
    z-index: -1;
    top: -50%;
    left: 45%;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(-45deg) scale(1.5);
    background-color: rgba(255, 255, 255, 0.2);
  }
  & .form-info-section::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 50%;
    left: 60%;
    z-index: -1;
    -webkit-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    transform: rotate(15deg) scale(1.5);
    background-color: rgba(255, 255, 255, 0.1);
  }
  /* & form::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    top: 0;
    z-index: 5;
  } */
  /* & form::nth-of-type(1)::after {
    left: 50%;
  }
  & form::nth-of-type(2)::after {
    left: 0%;
  } */
  & .register-container {
    width: 100%;
    /* margin: auto; */
    border-radius: 5px;
    background-color: var(--purple);
    padding: 10px;
    display: flex;
    /* flex-direction: column; */
    & label {
      position: relative;
      padding: 5px;
      /* margin: auto; */
      width: 100%;
      display: block;
      border-bottom: 3px solid var(--green);
      margin-top: 30px;
      & input {
        border: none;
        background-color: transparent;
        outline: none;
        color: #fff;
        text-indent: calc(1% + 25px);
        width: 100%;
        &:focus + span,
        &:valid + span {
          transform: translateY(-200%);
        }
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:active,
        &:-webkit-autofill:focus {
          background-color: transparent !important;
        }
        &::placeholder {
          background-color: transparent !important;
        }
      }
    }
    & label::before {
      font-family: "Font Awesome\ 5 Free";
      position: absolute;
      font-weight: 900;
      top: 50%;
      left: 1%;
      transform: translateY(-50%);
    }
    & label > span {
      position: absolute;
      left: calc(1% + 30px);
      transition: transform 0.2s;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
    & label[for$="password"] span p {
      position: absolute;
      display: flex;
      /* align-items: center; */
      width: 100px;
      /* height: 100%; */
      top: 0;
      left: 110%;
    }
    & label[for$="password"] span p::before {
      position: absolute;
      content: "";
      height: 100%;
      z-index: -1;
      width: 100%;
      /* direction: rtl; */
      background-image: linear-gradient(to right, red 25%, transparent 25%),
        linear-gradient(to right, orange 50%, transparent 50%),
        linear-gradient(to right, yellow 75%, transparent 75%),
        linear-gradient(to right, green 100%, transparent 100%);
    }
    & label[for$="password"] span kbd {
      position: absolute;
      /* content: var(--password-meter-remark); */
      top: 57%;
      left: 110%;
      font-size: 10px;
      width: max-content;
    }
    & label[for$="password"] span p::after {
      position: absolute;
      content: "";
      height: 100%;
      z-index: -1;
      transition: left 0.2s;
      top: 0;
      left: calc(var(--password-meter) * 1%);
      right: 0;
      bottom: 0;
      background-image: linear-gradient(to right, var(--purple), var(--purple));
    }
    & label[for$="password"] span p span {
      display: block;
      /* width: 20px; */
      flex: 1;
      height: 10px;
      border: 1px solid var(--green);
      margin: 0 -0.5px;
    }
    & label[for$="password"] .showPassword {
      position: absolute;
      /* text-align: center; */
      display: none;
      justify-content: center;
      align-items: center;
      bottom: 0%;
      right: 0%;
      cursor: pointer;
      height: 30px;
      width: 30px;
    }
    & label[for$="confirm-password"] .confirm-password-state {
      position: absolute;
      height: 30px;
      width: 30px;
      bottom: 0;
      right: 0;
      display: none;
      justify-content: center;
      align-items: center;
    }
    & label[for$="username"]::before {
      content: "\f007";
    }
    & label[for$="email"]::before {
      content: "\f0e0";
    }
    & label[for$="password"]::before {
      content: "\f023";
    }
    & label[for$="confirm-password"]::before {
      content: "\f023";
    }
    & button {
      --lightness: 50%;
      display: block;
      width: 50%;
      text-align: center;
      outline: none;
      border: none;
      border-radius: 4px;
      padding: 10px 0;
      transition: all 0.2s;
      text-transform: uppercase;
      background-color: hsl(120, 71%, var(--lightness));
      margin: 40px 0px 10px;
      color: #fff;
      font-weight: bolder;
      cursor: pointer;
      &:hover {
        /* opacity: 0.5; */
        --lightness: 60%;
        /* background-color: var(--green); */
      }
    }
  }
`;

export default ModalStyle;
