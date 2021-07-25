import React from "react";
import styled from "styled-components";
import Router from 'next/router';
import AcceptConnection from './AcceptConnection';
import DeclineConnection from './DeclineConnection';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";

export const RequestList = styled.div`
  display: flex;
  max-width: 800px;
  height: 100px;
  align-items: center;
  padding: 10px;
  border: 2px solid ${(props) => props.theme.lightgrey};
  box-shadow: 5px 5px 10px 1px grey,
  2px 2px 15px 2px grey inset;
  border-radius: 5px;
  background: white;
  text-align: justify;

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
    background: grey;
  }

  .conversation-title {
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
    margin: 0;
  }

  .conversation-snippet {
    font-size: 12px;
    color: #888;
    margin: 0;
    text-overflow: initial;
    white-space: nowrap;
    max-width: 10rem;
  }

  .action-items {    
    display: flex;
    position: absolute;
    right: 10%;

    .action-button{
      color: ${(props) => props.theme.green};
      background: none;
      border: 1px solid ${(props) => props.theme.green};
      font-size: 14px;
      height: 35px;
      width: 60;
      // vertical-align: top;
      // margin-right: 10px;
      :hover {
        background: ${(props) => props.theme.lightgreen};
        cursor: pointer;
      }
    }
  }
`;


class SingleRequest extends React.Component {
  render() {
    const { request } = this.props;

    return (
      <RequestList>
        <img className="conversation-photo" src={request.profilePic} />
        <div className="conversation-info">
          <h1 className="conversation-title">{request.name}</h1>
          <p className="conversation-snippet">{request.title} at {request.company}</p>
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
