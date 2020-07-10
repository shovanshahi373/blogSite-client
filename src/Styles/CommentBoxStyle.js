import styled from "styled-components";

const CommentBoxStyle = styled.div`
  & > div {
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-column-gap: 10px;
    grid-auto-rows: minmax(200px, auto);
  }
  & .image-container {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #ccc;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: ${(props) =>
      props.avatar ? `url(${props.avatar})` : ""};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border: 3px solid var(--purple);
  }
  & textarea {
    resize: none;
    width: 100%;
    max-height: max-content;
    overflow: hidden;
    outline: none;
    padding: 5px;
    margin: 20px 0;
    transition: all 0.2s;
    border: none;
    background-color: transparent;
    border-bottom: 3px solid #ccc;
    &:focus {
      border-bottom-color: var(--purple);
    }
  }

  & button {
    background-color: var(--green);
    padding: 5px;
    text-transform: uppercase;
    margin: 0 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    color: white;
    &: hover {
      opacity: 0.8;
    }
    &.writeComment {
      &::before {
        font-family: "Font Awesome\ 5 Free";
        font-weight: 900;
        content: "\f067";
        margin: 0 4px;
      }
    }
  }
`;

export default CommentBoxStyle;
