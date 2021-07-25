import Link from "next/link";
import React, { Component } from "react";
import styled from "styled-components";
import Closed1Button from "./styles/Closed1Button";

const Response = styled.div`
  display: grid;
  padding: 1rem;
  grid-auto-rows: auto;
  font-size: 2rem;
  color: #26A69A;
  button {
    width: 200px;
  }
`;

class ContactsLimitReached extends Component {
  render() {
    return (
        <Response>
          <h3>  You've exceeded the free user Quota to add any more contacts</h3>
          <h4>  Please upgrade to paid account for unlimited access</h4>
          <Link href="/upgradeAccount">
          <Closed1Button>Upgrade Account</Closed1Button>
          </Link>
        </Response>
    );
  }
}

export default ContactsLimitReached;
