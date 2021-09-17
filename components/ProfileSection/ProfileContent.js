import React, { Component } from "react";
import styled from "styled-components";
import Closed1Button from "../styles/Closed1Button";
import SendConnection from "../Connections/SendConnection";
import RemoveFriend from "../Connections/RemoveFriend";
import CancelRequest from "../Connections/CancelRequest";
import AcceptConnection from "../Connections/AcceptConnection";
import DeclineConnection from "../Connections/DeclineConnection";
import Router from "next/router";

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  button {
    height: 4rem ;
  }
  
  .buttons-sequence {
    display: grid;
    align-items: center;

  .edit-profile {
    font-size: 14px;
  }

  .messaging {
    border: 1px solid ${(props) => props.theme.green};
    color: black;
    background: none;
    
    :hover {
      cursor: pointer;
      background: ${(props) => props.theme.lightgreen};
    }
  }
`;

class ProfileContent extends Component {
  state = {
    buttonSequence: "",
  };

  componentDidMount() {
    this.getRequestStatus();
  }

  getRequestStatus = () => {
    const { user, me } = this.props;
    const boolMine = me.id === user.id;
    let sentRequests = me.sent.map((a) => a.id);
    let friends = me.friends.map((a) => a.id);
    let receivedRequests = me.received.map((a) => a.id);
    if (boolMine) {
      this.setState({ buttonSequence: "1" });
    } else if (friends.includes(user.id)) {
      this.setState({ buttonSequence: "2" });
    } else if (sentRequests.includes(user.id)) {
      this.setState({ buttonSequence: "3" });
    } else if (receivedRequests.includes(user.id)) {
      this.setState({ buttonSequence: "4" });
    }
  };

  getButtons = () => {
    const { user, me } = this.props;
    const { buttonSequence } = this.state;
    const [conversation] = user.conversations.filter((conversation) => {
      let participants = conversation.participants.map((a) => a.id);
      if (participants.includes(me.id)) {
        return conversation.id;
      }
      return null;
    });
    switch (buttonSequence) {
      case "1":
        return (
          <div className="buttons-sequence">
            <Closed1Button
              className="edit-profile m-0"
              onClick={()=>Router.push({
                pathname: "/editMyProfile",
              })}
            >
              Edit Profile
            </Closed1Button>
            {/* <Closed1Button className="more-button">More...</Closed1Button> */}
          </div>
        );
      case "2":
        return (
          <div>
          <button className="messaging" onClick={() => routeToMessaging(conversation.id)}>
            Message
          </button>
            <RemoveFriend userId={user.id} conversationId={conversation.id} />
          </div>
        );
      case "3":
        return (
          <div className="buttons-sequence">
            <Closed1Button className="pending">Pending...</Closed1Button>
            <CancelRequest userId={user.id} />
          </div>
        );
        case "4":
          return (
            <div className="buttons-sequence">
            <AcceptConnection userId={user.id} me={me} />
            <DeclineConnection userId={user.id} />
            </div>
          );
      default:
        return <SendConnection user={user} me={me} />;
    }
  };
  render() {
    const { user, me } = this.props;
    const boolMine = me.id === user.id;
    return (
      <Content>
        <h2 className="grid-col-3 m-0 font-weight-normal"> {user.name} </h2>
        <div className="d-grid grid-template-columns-1 grid-md-template-columns-2 grid-col-3">
          <div>
          {user.title && user.company ?  <h4 className="m-0 font-weight-normal">
              {user.title} @ {user.company} 
            </h4> : '' }
            {user.city && user.state ? <h4 className="m-0 font-weight-normal">
              {user.city},{user.state}
            </h4> : '' }
            {/* <div> {user.country}</div> */}
            {/* {boolMine ? (
              <a href="/connections">&#9900;Connection Requests&#9900;</a>
            ) : (
              ""
            )} */}
          </div>
          <div>
          {user.territory ? <div> <strong>Territory</strong>: {user.territory}</div> : ''}
          {user.targetBuyers ? <div> <strong>Target Buyers</strong>: {user.targetBuyers}</div> : ''}
            {boolMine && user.phone ? <div> <strong>Phone</strong>: &nbsp;{user.phone} </div> : ""}
          </div>
        </div>
        <div className="grid-col-3 grid-md-col-1">
          {this.getButtons()}
        </div>
      </Content>
    );
  }
}

export default ProfileContent;
