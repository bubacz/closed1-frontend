import React, { Component } from "react";
import Link from "next/link";
import { DropdownButton, Dropdown } from "react-bootstrap";
import styled from "styled-components";

const NavItem = styled.div`
.menu-box {
    border: 1px solid #26A69A;
    background: #fff;
    z-index: 2;
    margin: 5px;
}
.profile-nav-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.dropdown-toggle {
    padding: 2px 30px;
    margin : 0;
    flex-direction: column;
} 
button:after {
    display: none;
}
a{
    color:#26A69A
}
a:after {
  background: #fff
}
a:hover {
    color: white
    background: #26A69A;
}
.separator {
    border-bottom: 1px solid  #26A69A;
}
h3 {
    margin: 5px;
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
              <h3>Account</h3>
            <Dropdown.Item eventKey="1"  href="/myProfile">View Profile</Dropdown.Item>
            <Dropdown.Item eventKey="2" href="/editMyProfile">Edit Profile</Dropdown.Item>
            <Dropdown.Item eventKey="3" href="/upgradeAccount"> Modify Subscription </Dropdown.Item>
            <div className="separator" />
            <Dropdown.Item eventKey="4">Sign Out</Dropdown.Item>
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
