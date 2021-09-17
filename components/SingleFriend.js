import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import User from "../Assets/user.png";
import Router from "next/router";
import SendConnection from "./Connections/SendConnection";
import Closed1Button from "./styles/Closed1Button";
import CancelRequest from "./Connections/CancelRequest";
import RemoveFriend from "./Connections/RemoveFriend";

export const ConversationList = styled.div`
  display: flex;
  max-width: 800px;
  height: 100px;
  align-items: center;
  padding: 10px;
  border: 2px solid ${(props) => props.theme.lightgrey};
  border-radius: 10px;
  background: white;

  .conversation-list-item:hover {
    background: solid blue;
    cursor: pointer;
  }

  .conversation-photo {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  .conversation-title {
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
    margin: 0;
    :hover {
      cursor: pointer;
      color: ${(props) => props.theme.green};
    }
  }

  .conversation-snippet {
    font-size: 12px;
    color: #888;
    margin: 0;
    text-overflow: initial;
    white-space: nowrap;
  }

  .connected-info {
    font-size: 10px;
  }

  .action-items {
    color: ${(props) => props.theme.green};
    position: absolute;
    right: 0;
    padding-right: 10%;

    .messaging {
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
    }
    .sequence-button {
      display: inline-flex;
      button{
        font-size: 14px;
      }
      width: 25%;
    }
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

class SingleFriend extends React.Component {
  handleClick = (id) => {
    Router.push({
      pathname: "/userProfile",
      query: { id: id },
    });
  };

  getButtons = () => {
    const { id, data, me, isRequested } = this.props;
    const [conversation] = me.conversations  ? me.conversations.filter((conversation) => {
      let participants = conversation.participants.map((a) => a.id);
      if (participants.includes(data.id)) {
        return conversation.id;
      }
      return null;
    }) : '';
    switch (id) {
      case "FindNew":
        return (
          <div>
            {isRequested ? (
              <div className="sequence-button">
                <Closed1Button>Pending...</Closed1Button>
                <CancelRequest userId={data.id} />
              </div>
            ) : (
              <SendConnection user={data} me={this.props.me} />
            )}
          </div>
        );
      case "FriendsList":
        return (
          <div>
          <button className="messaging" onClick={() => routeToMessaging(conversation.id)}>
            Message
          </button>
            <RemoveFriend userId={data.id} conversationId={conversation.id} />
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    const user = this.props.data;
    return (
      <ConversationList>
        <img
          className="conversation-photo"
          src={user.profilePic ? user.profilePic : User}
        />
        <div className="conversation-info">
          <h1
            className="conversation-title"
            onClick={() => {
              this.handleClick(user.id);
            }}
          >
            {user.name}
          </h1>
          {user.title && user.company ? (
            <p className="conversation-snippet">
              {user.title} @ {user.company}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="action-items ">{this.getButtons()}</div>
      </ConversationList>
    );
  }
}

export default SingleFriend;
