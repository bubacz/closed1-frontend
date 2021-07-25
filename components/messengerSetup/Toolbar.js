import React from "react";
import styled from "styled-components";

const ToolBarStyle = styled.div`
  .toolbar {
    display: flex;
    align-items: center;

    background-color: white;
    font-weight: 500;
    border-bottom: 1px solid #eeeef1;

    position: sticky;
    top: 0px;
  }

  @supports (backdrop-filter: blur(20px)) {
    .toolbar {
      border: none;
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
    }
  }

  .toolbar-title {
    margin: 0;
    color: #3ca99d;
    font-size: 20px;
    font-weight: 800;
    text-align: center;
  }

  .left-items,
  .right-items {
    flex: 1;
    padding: 10px;
    display: flex;
  }

  .right-items {
    flex-direction: row-reverse;
  }

  .left-items .toolbar-button {
    margin-right: 20px;
  }

  .right-items .toolbar-button {
    margin-left: 20px;
  }

  .left-items .toolbar-button:last-child,
  .right-items .toolbar-button:last-child {
    margin: 0;
  }
`;
class Toolbar extends React.Component {
  render() {
    const { title, /*leftItems, rightItems*/ } = this.props;
    return (
      <ToolBarStyle>
        {/* <div className="left-items">{leftItems}</div> */}
        <h1 className="toolbar-title">{title}</h1>
        {/* <div className="right-items">{rightItems}</div> */}
      </ToolBarStyle>
    );
  }
}
export default Toolbar;
