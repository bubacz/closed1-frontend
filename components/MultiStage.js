import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import ConnectionRequests from "./Connections/ConnectionRequests";
import FindNew from "./FindNew";
import InviteFriend from "./InviteFriend";
import Friends from "./Friends";
import { Query } from "react-apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "./LoadingSpinner";
import {
  faUserFriends,
  faBell,
  faSearchPlus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

const Stages = styled.div`
  position: absolute;
  top: 18%;
  left: 25%;
  text-align: -webkit-center;
  width: 800px;
  .header {
    a {
      display: inline-block;
      font-size: 1.8rem;
      border: double;
      padding: 1rem;
      height: 6rem;
      min-width: 199px;
      max-width: 199px;
      // border-radius: 5px;
      :hover {
        cursor: pointer;
        background: ${(props) => props.theme.lightgreen};
        color: white;
        border: double;
        min-width: 200px;
        height: 6.2rem;
      }
    }
  }
  .active {
    background-color: ${(props) => props.theme.green};
    color: white;
    min-width: 200fpx;
    height: 6.2rem;
  }
  .notification-badge {
    position: absolute;
    top: 5px;
    font-size: 15px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ffdd22;
    color: #26A69A;
    z-index: 2;
  }
`;

const GET_USER_DATA_QUERY = gql`
  query {
    me {
      id
      name
      email
      profilePic
      conversations {
        id
        participants {
          id
        }
      }
      friends {
        id
        name
        title
        profilePic
      }
      sent {
        id
      }
      received {
        id
        name
        title
        profilePic
      }
    }
  }
`;
class MultiStage extends Component {
  state = {
    id: "1",
  };

  componentDidMount() {
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ id: e.target.id });
  };

  fetchComponent = (me) => {
    const { id } = this.state;
    // const list ={hidden:{scale:.8, opacity:0}, visible:{ scale:1, opacity:1, transition:{delay:.5}}};
    switch (id) {
      case "1":
        return  <Friends friendsList={me.friends} user={me} />;
      case "2":
        return  <ConnectionRequests user={me} />;
      case "3":
        return  <FindNew currentUser={me} />;
      case "4":
        return  <InviteFriend />;
      default:
        return null;
    }
  };
  render() {
    const { id } = this.state;
    return (
      <Query query={GET_USER_DATA_QUERY} fetchPolicy="cache-and-network">
        {({ error, loading, data }) => {
          if (loading) return <LoadingSpinner />;
          if (data)
            return (
              <Stages data-aos="fade-up">
                <div className="header">
                  <a
                    id="1"
                    onClick={this.handleClick}
                    className={id === "1" ? "active" : ""}
                  >
                    <FontAwesomeIcon icon={faUserFriends} /> &nbsp; Friends
                  </a>
                  <a
                    id="2"
                    onClick={this.handleClick}
                    className={id === "2" ? "active" : ""}
                  >
                    <FontAwesomeIcon icon={faBell} />
                    &nbsp; Requests {data.me.received.length > 0 ?
                    <span className="notification-badge">{data.me.received.length}</span> : '' }
                  </a>
                  <a
                    id="3"
                    onClick={this.handleClick}
                    className={id === "3" ? "active" : ""}
                  >
                    <FontAwesomeIcon icon={faSearchPlus} />
                    &nbsp; Find New
                  </a>
                  <a
                    id="4"
                    onClick={this.handleClick}
                    className={id === "4" ? "active" : ""}
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                    &nbsp; Invite Friends
                  </a>
                </div>
                <div className="content-section">
                  <AnimatePresence>
                  <div>{this.fetchComponent(data.me)}</div>
                  </AnimatePresence>
                </div>
              </Stages>
            );
        }}
      </Query>
    );
  }
}

export default MultiStage;
