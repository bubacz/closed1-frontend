import React, { Component } from "react";
import styled from "styled-components";
import SingleRequest from "./SingleRequest";
import { motion } from "framer-motion";

const StylingFriends = styled.div`
  margin-top: 2rem;
  text-align: -webkit-center;
  flex-flow: row;
  height: 100%;
  .utilities-section {
    align-items: baseline;
    color: ${(props) => props.theme.green};
    font-size: 20px;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    width: 800px;
    height: 5rem;
  }

  .sort-field {
    width: 15rem;
    height: 3rem;
  }
`;

class ConnectionRequests extends Component {
  render() {
    const { user } = this.props;
    return (
      <StylingFriends>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { scale: 0.6, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { delay: 0.3 } },
        }}
      >
        {user.received.length > 0 ? (
          user.received.map((contact) => {
            return <SingleRequest key={contact.id} request={contact} />;
          })
        ) : (
          <div>
            <br />
            <br /> No Requests
          </div>
        )}
        </motion.div>
      </StylingFriends>
    );
  }
}

export default ConnectionRequests;
