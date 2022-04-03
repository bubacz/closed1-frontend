import React, { Component } from "react";
import styled from "styled-components";
import SingleFriend from "./SingleFriend";
import ConversationSearch from "./ConversationSearch";
import { motion } from "framer-motion";

const StylingFriends = styled.div`
  text-align: -webkit-center;
  flex-flow: row;
  height: 100%;
  .utilities-section {
    align-items: baseline;
    background: ${(props) => props.theme.green};
    display: flex;
    justify-content: flex-end;
    width: 800px;
    max-width: 100%;
  }

  .sort-field {
    width: 15rem;
    height: 3rem;
  }
`;

class Friends extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts = () => {
    let { contacts } = this.state;
    const { friendsList } = this.props;
    if (friendsList) {
      contacts = friendsList;
    }
    this.setState({ contacts });
    return contacts;
  };

  trials = (keypress) => {
    const contacts = this.fetchContacts();
    const filteredContacts = contacts.filter((contact) => {
      const personName = contact.name.toLowerCase();
      return personName.includes(keypress);
    });
    this.setState({ contacts: filteredContacts });
  };

  render() {
    const { contacts } = this.state;
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
          <div className="utilities-section">
            <ConversationSearch triggerSearch={this.trials} usage="friends" />
          </div>
          {contacts.map((contact) => (
            <SingleFriend
              key={contact.id}
              data={contact}
              me={this.props.user}
              id="FriendsList"
            />
          ))}
        </motion.div>
      </StylingFriends>
    );
  }
}

export default Friends;
