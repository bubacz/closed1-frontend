import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import SingleFriend from "./SingleFriend";
// import { conversations } from "./messengerSetup/Messenger";
import ConversationSearch from "./messengerSetup/ConversationSearch";
import Form from "./styles/Form";
import { AnimatePresence, motion } from "framer-motion";
// import TemplateImage from "../Assets/backHero.jpg"

const StylingFriends = styled.div`
  text-align: -webkit-center;
  flex-flow: row;
  height: 100%;
  .utilities-section {
    align-items: baseline;
    background: ${(props) => props.theme.green};
    display: flex;
    justify-content: center;
    width: 800px;
    border-radius: 10px;
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

  handlesort = (e) => {
    e.preventDefault();
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
            {/* <form>
              <label>
                Sort By
                <select
                  onChange={this.handlesort}
                  className="form-control sort-field"
                >
                  <option />
                  <option value="1">A-Z</option>
                  <option value="2">Z-A</option>
                  <option value="3">Recently Connected</option>
                  <option value="4">Earliest Connected</option>
                </select>
              </label>
            </form> */}
            {/* <input as="select" placeholder="sortBy" /> */}
            <ConversationSearch triggerSearch={this.trials} usage="friends" />
          </div>
          {contacts.map((contact) => (
            <SingleFriend
              key={contact.id}
              data={contact}
              user={this.props.user}
              id="FriendsList"
            />
          ))}
        </motion.div>
      </StylingFriends>
    );
  }
}

export default Friends;
