
import styled from "styled-components";

 const ComposeStyle = styled.div`
  .compose {
    padding: 10px;
    display: flex;
    align-items: center;
    background: white;
    border-top: 1px solid #eeeef1;
    position: fixed;
    width: calc(100% - 20px);
    bottom: 0px;
  }

  @supports (backdrop-filter: blur(20px)) {
    .compose {
      border: none;
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
    }
  }

  .compose-input {
    border: 1px solid ${(props) => props.theme.green};
    font-size: 16px;
    height: 40px;
    background: none;
    width: 75%;
  }

  .compose-input::placeholder {
    opacity: 0.3;
  }

  .compose .toolbar-button {
    color: white;
    font-size: 16px;
    border: solid ${(props) => props.theme.green};
    background: ${(props) => props.theme.green};
    width: 60px;
    height: 35px;
    text-align: center;
    margin: 5px;
  }

  .compose .toolbar-button:hover {
    cursor: pointer;
    color: ${(props) => props.theme.green};
    background: #e0e0e6;
  }
`;

export default ComposeStyle;