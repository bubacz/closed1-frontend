import React from "react";
import Router from "next/router";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "../ErrorMessage";
import ConversationSearch from "./ConversationSearch";
import ConversationListItem from "./ConversationListItem";
import Toolbar from "./Toolbar";
import styled from "styled-components";

const ConversationSection = styled.div`
  background: ${(props) => props.theme.offWhite};
`;

class ConversationList extends React.Component {
  state = {
    conversations: [],
  };

  componentDidMount() {
    this.fetchConversations();
  }

  fetchConversations = () => {
    let { conversations } = this.state;
    conversations = this.props.conversationList;
    this.setState({ conversations });
    return conversations;
  };

  trials = (keypress) => {
    const conversations = this.fetchConversations();
    const filteredConversations = conversations.filter((conversation) => {
      const personName = conversation.name.toLowerCase();
      return personName.includes(keypress);
    });
    this.setState({ conversations: filteredConversations });
  };

  handleClick = (name) => {
    Router.push({
      pathname: "/messengerPage",
      query: {
        name: name,
      },
    });
  };

  render() {
    const { conversations } = this.state;

    return (
      <ConversationSection>
        <Toolbar title="Messenger" />
        <ConversationSearch triggerSearch={this.trials} />
        {conversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            data={conversation}
            onSelect={this.handleClick}
          />
        ))}
      </ConversationSection>
    );
  }
}

export default ConversationList;
