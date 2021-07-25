import React from "react";
import styled from "styled-components";
import User from "../../Assets/user.png";

export const ConversationListItemstyle = styled.div`
  padding: 1rem;
  border: solid 1px #ccc;
  border-radius: 0.5rem;
  background: white;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;

  :hover {
    cursor: pointer;
    background: aliceblue;
  }
  .conversation-photo {
    display: block;
    background: ${props=> props.theme.offWhite};
    border: 2px solid ${props=> props.theme.lightgreen};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  .conversation-title {
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
    margin: 0;
  }

  .conversation-snippet {
    display: inline-block;
    width: 13rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #888;
    margin: 0;
    white-space: nowrap;
  }

  .timestamp {
    position: relative;
    top: 2px;
    left: 20px;
    font-size: 12px;
  }
`;

class ConversationListItem extends React.Component {
  render() {
    const { user, lastMessage, lastAuthor, when } = this.props;
    console.log('check log user', user);

    return (
      <ConversationListItemstyle
        onClick={this.props.onSelect}
        data-aos="fade-right"
        data-aos-duration="500"
      >
        <img className="conversation-photo" src={user.profilePic || User} />
        <div className="conversation-info">
          <h1 className="conversation-title">{user.name}</h1>
          <div style={{ display: "flex" }}>
            <span className="conversation-snippet">
              {lastAuthor}
              {lastMessage}
            </span>
            <span className="timestamp">{when}</span>
          </div>
        </div>
      </ConversationListItemstyle>
    );
  }
}

export default ConversationListItem;
