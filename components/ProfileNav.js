import React, { Component } from "react";
import Link from "next/link";
import { DropdownButton, Dropdown } from "react-bootstrap";
import SignOut from "./Signout";
import styled from "styled-components";

const NavItem = styled.div`
.menu-box {
    border: 1px solid #26A69A;
    background: #fff;
    z-index: 2;
    margin: 5px;
    padding: 1rem 0;
}
.menu-item {
  padding: 2rem;
}
.profile-nav-img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
}
.dropdown-toggle {
    padding: 2px 30px;
    margin : 0;
    flex-direction: column;
} 
.dropdown-menu {
  a, button {
    color: #26A69A;
    width: 100%;
  }

  button {
    padding: 1rem;
  }
}
.dropdown-item {
  color: #26A69A;
}
button:after {
    display: none;
}
a:after {
  background: #fff
}
a:hover {
    color: white
    background: #26A69A;
}
.separator {
    margin: 1rem 0;
    border-bottom: 1px solid  #26A69A;
}
`
class ProfileNav extends Component {
  render() {
    const { user } = this.props;
    return (
      <NavItem>
        <Dropdown alignRight>
          <Dropdown.Toggle id="dropdown-custom-1" variant="success">
              <img src={user.profilePic} className="profile-nav-img" />
              <div> Me &#9660;</div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="menu-box">
            <Dropdown.Item eventKey="1" className="menu-item"  href="/myProfile">View Profile</Dropdown.Item>
            <Dropdown.Item eventKey="2" className="menu-item" href="/editMyProfile">Edit Profile</Dropdown.Item>
            <Dropdown.Item eventKey="3" className="menu-item" href="/upgradeAccount"> Modify Subscription </Dropdown.Item>
            <div className="separator" />
            <SignOut eventKey="4" />
          </Dropdown.Menu>
        </Dropdown>

        {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Menu className="super-colors">
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu></DropdownButton> */}
      </NavItem>
    );
  }
}
export default ProfileNav;
