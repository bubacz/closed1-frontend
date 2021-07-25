import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Loader from "react-loader-spinner";

const customStyles = {
  content: {
    width: "100%",
    height: "100%",
    background: "transparent",
    border: "none",
  },
};

const Item = styled.div`
  position: fixed;
  top: 45%;
  left: 45%;
`;
class LoadingSpinner extends Component {
  render() {
    return (
      <Modal isOpen style={customStyles} ariaHideApp={false}>
        <Item>
          <Loader
            type="Oval"
            color="green"
            height={100}
            width={100}
            // timeout={100000} //3 secs
          />
        </Item>
      </Modal>
    );
  }
}

export default LoadingSpinner;
