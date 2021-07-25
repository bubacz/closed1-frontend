import React, { Component } from "react";
import Router from "next/router";
import styled from "styled-components";

const Content = styled.div`
  color: ${(props) => props.theme.green};
  background: none;
  border: 1px solid ${(props) => props.theme.green};
  font-size: 14px;
  height: 30px;
  width: 100px;
  vertical-align: top;
  margin-right: 10px;
  :hover {
    background: ${(props) => props.theme.lightgreen};
    cursor: pointer;
  }
`;

function routeToMessaging(id) {
  Router.push({
    pathname: "/messengerPage",
    query: {
      id: id,
    },
  });
}

class MessageButton extends Component {
  state = {
    id: "",
  };
  componentDidMount() {
    this.getConversationWithUser();
  }
  componentDidUpdatet(prevProps) {
    if (this.props !== prevProps) {
      this.getConversationWithUser();
    }
  }

  getConversationWithUser() {
    const { user, me } = this.props;
    const [filteredConversation] = user.conversations.filter((conversation) => {
      let participants = conversation.participants.map((a) => a.id);
      if (participants.includes(me)) {
        return conversation.id;
      }
      return null;
    });
    this.setState({ id: filteredConversation.id });
  }

  render() {
    const { id } = this.state;
    return (
      <button className="messaging" onClick={() => routeToMessaging(id)}>
        Message
      </button>
    );
  }
}

export default MessageButton;
