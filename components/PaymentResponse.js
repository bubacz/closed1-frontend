import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Closed1Button from "./styles/Closed1Button";

const customStyles = {
  content: {
    width: "900px",
    height: "20rem",
    top: "25%",
    left: "50%",
    borderRadius:"20px",
    marginRight: "-50%",
    transform: "translate(-50%, -20%)",
  },
};

const Response = styled.div`
  display: grid;
  padding: 1rem;
  grid-auto-rows: auto;
  font-size: 2rem;
  color: darkgreen;
  button {
    width: 100px;
    position: relative;
    left: 80%;
  }
`;

class PaymentResponseModal extends Component {
  state= {
    isOpen: false,
  }

  componentDidMount(){
    const { isOpen } = this.props;
    if(isOpen){
      this.setState({isOpen: isOpen})
    }
  }
  render() {
    return (
      <Modal isOpen={this.state.isOpen} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
        <Response>
          <h2> &#10003; Payment Status will be displayed here</h2>
          <Closed1Button onClick={()=> this.setState({isOpen: false})}>Close</Closed1Button>
        </Response>
      </Modal>
    );
  }
}

export default PaymentResponseModal;
