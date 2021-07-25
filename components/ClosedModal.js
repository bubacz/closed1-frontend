import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Closed1Button from "./styles/Closed1Button";
import Link from "next/link";

const customStyles = {
  content: {
    width: "50%",
    height: "25%",
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -20%)",
  },
};

const Response = styled.div`
  display: block;
  font-size: 2rem;
  background: azure;
  color: darkgreen;
  box-shadow: 3px 3px 3px 3px yellow;
`;

class ClosedModal extends Component {
  render() {
    const { isOpen } = this.props;
    return (
      <Modal isOpen={isOpen} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
        <Response>
          <h2> &#10003; your password reset has been succesful</h2>
          <Link href="/">
            <Closed1Button>LogIn</Closed1Button>
          </Link>
        </Response>
      </Modal>
    );
  }
}

export default ClosedModal;
