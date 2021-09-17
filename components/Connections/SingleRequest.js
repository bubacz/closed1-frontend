import React from "react";
import styled from "styled-components";
import Router from 'next/router';
import AcceptConnection from './AcceptConnection';
import DeclineConnection from './DeclineConnection';
import User from "../../Assets/user.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";

export const RequestList = styled.div`
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


class SingleRequest extends React.Component {
  render() {
    const { request } = this.props;

    return (
      <RequestList>
        <img className="conversation-photo" src={request.profilePic ? request.profilePic : User} />
        <div className="conversation-info">
          <h1 className="conversation-title">{request.name}</h1>
          <p className="conversation-snippet">{request.title} {request.company && `at ${request.company}`}</p>
          {/* <p className="conversation-snippet">{text}</p> */}
        </div>
        <div className="action-items ">
        <AcceptConnection userId={request.id}/>
        <DeclineConnection userId={request.id}/>
        </div>
      </RequestList>
    );
  }
}

export default SingleRequest;
