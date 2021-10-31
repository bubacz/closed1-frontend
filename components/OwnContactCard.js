import React, { Component } from "react";
import styled from "styled-components";
import User from "../Assets/user.png";
import Router from "next/router"; 

const SingleContact = styled.div`
  .title {
    border-radius: 0.5rem;
    border-bottom: 2px solid ${(props) => props.theme.lightgrey};
    background: ${(props) => props.theme.green};
    display: grid;
    height: 8rem;
    .photo {
      padding: 5px;
      width: 200px;
      height: 60px;
    }
  }

  .user-photo {
    background: ${props=> props.theme.offWhite};
    border: 2px solid ${props=> props.theme.lightgreen};
    width: 85px;
    height: 85px;
    border-radius: 50%;
  }

  .user-details {
    text-align: center;

    .user-name {
      margin-top: 1rem;
      font-weight: 600;
      :hover{
        cursor: pointer;
        color: ${props=>props.theme.lightgreen};
        font-size: 16px;
        font-weight: bold;
        text-decoration: underline;
      }
    }

    .role {
      padding: 0rem 2rem;
      color: grey;
    }
  }
  .navigate {
    padding: 2rem;
  }
`;
class ContactCard extends Component {
  render() {
    const { user }= this.props;
    return (
      <SingleContact className="card">
        <div className="card-body">
          {/* <div className="title">
                  <img className="photo" src={Close} />
                </div> */}
          <div className="user-details">
            <img className="user-photo" src={user.profilePic || User} />
            <div className="user-name" onClick={()=> Router.push({pathname: "/myProfile"})}>{user.name}</div>
            {user.title && user.company&& <div className="role">
              {user.title} at {user.company}
            </div>}
            <hr />
            {user.status === 'FREE' ? <div>Subscribe to Closed1 for Unlimited Access <button type="button" onClick={()=>Router.push({pathname: '/upgradeAccount'})}>Subscribe</button></div> : ''}
          </div>
        </div>
      </SingleContact>
    );
  }
}

export default ContactCard;
