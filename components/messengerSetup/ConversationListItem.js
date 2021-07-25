import React from "react";
import styled from "styled-components";

export const ConversationList = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  border: double;
  border-radius: 10px;
  background: white;

  .conversation-list-item:hover {
    background: solid blue;
    cursor: pointer;
  }

  .conversation-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  .conversation-title {
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
    margin: 0;
  }

  .conversation-snippet {
    font-size: 14px;
    color: #888;
    margin: 0;
    text-overflow: initial;
    white-space: nowrap;
  }
`;

class ConversationListItem extends React.Component {
  handleChat = () => {
    const key = this.props.data.id;
    this.props.onSelect(key);
  };

  render() {
    const { profilePic, name, messages } = this.props.data;
    const l = messages.length;

    return (
      <ConversationList onClick={this.handleChat}>
        <img className="conversation-photo" src={profilePic}   />
        <div className="conversation-info">
          <h1 className="conversation-title">{name}</h1>
          {messages[l-1] ? <p className="conversation-snippet">{messages[l-1].content}</p> : '' }
        </div>
      </ConversationList>
    );
  }
}

export default ConversationListItem;
