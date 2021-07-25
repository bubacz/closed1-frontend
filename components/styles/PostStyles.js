import styled from "styled-components";

const Post = styled.div`
.inactiveLink{
  pointer-events: none;
  cursor: default;
}

p {
  font-size: 12px;
  line-height: 1;
  font-weight: 300;
  flex-grow: 1;
  padding: 0 3rem;
  font-size: 1.5rem;
}

.post-content {
  line-height: 1.5;
}

.buttonList {
  text-align: right;

  & > * {
    padding: 1rem 1.5rem;
    border: 0;
    font-size: 1em;
    background: white;
  }
}
@media (min-width: 576px) {
  .buttonList {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
`;

export default Post;
