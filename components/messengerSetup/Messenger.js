import React from "react";
import styled from "styled-components";
import ConversationList from "./ConversationList";
import MessageList from "./MessageList";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "../ErrorMessage";

export const Messaging = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 350px auto;
  grid-template-rows: 60px auto 60px;
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  .container {
    padding: 10px;
  }
  .scrollable {
    position: relative;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .sidebar {
    background: white;
    grid-row-start: 1;
    grid-row-end: span 3;
  }
  .content {
    background: white;
    grid-row-start: 1;
    grid-row-end: span 3;
  }
  .vertical-line {
    position: absolute;
    left: 370px;
    border-left: 1px solid black;
    height: 100%;
  }
  .footer {
    grid-column-start: 2;
    background: white;
  }
`;

class Messenger extends React.Component {
  state = {
    selectedChat: "",
  };

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.selectedConversation(user);
    }
  }

  // componentWillUnmount() {
  //   // Clear the interval right before component unmount
  //   clearInterval(this.interval);
  // }

  componentDidUpdatet(prevprops) {
    const { user } = this.props;
    if (this.props !== prevprops) {
      this.setState({ selectedChat: "" }, () => {
        this.selectedConversation(user);
      });
    }
  }

  selectedConversation = (conversation) => {
    const { conversations } = this.props;
    if (conversation) {
      const pickedConversation = conversations.filter((singleChat) => {
        const personName = singleChat.id;
        return personName === conversation;
      });
      this.setState({ selectedChat: pickedConversation[0] });
    } else {
      this.setState({ selectedChat: "" });
    }
  };

  render() {
    const { selectedChat } = this.state;
    const { conversations } = this.props;
    return (
      <Messaging>
        <div className="scrollable sidebar">
          <ConversationList
            conversationList={conversations}
            selectedChat={this.selectedConversation}
          />
        </div>
        <div className= "vertical-line" />
        <div className="scrollable content">
          <MessageList conversation={selectedChat} me={this.props.me} />
        </div>
      </Messaging>
    );
  }
}

export default Messenger;
