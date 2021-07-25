import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import SingleGoogleContact from "./SingleGoogleContact";
import Closed1Button from "./styles/Closed1Button";
import Link from "next/link";

const customStyles = {
    content: {
      width: "50%",
      height: "75%",
      top: "12.5%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      boxShadow: "5px 10px 15px 5px #26A69A, 1px 1px 5px 5px grey inset",
    },
  };

const Response = styled.div`
  display: block;
  font-size: 2rem;
  background: azure;
  color: darkgreen;
  box-shadow: 20px 20px 10px 20px green;
`;

class InviteGoogleContacts extends Component {
  state = {
    contacts: "",
    searchResults: "",
  };

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts = () => {
    const { contacts } = this.props;
    if (contacts) {
      this.setState({ contacts: contacts });
    }
  };

  onChange = (e) => {
    const { contacts } = this.state;
    e.persist();
    const keyPress = e.target.value;
    this.setState({ inputValue: keyPress });
    if(keyPress.length >= 3){
    const searchResults = contacts.filter((contact) => {
      const userMail = contact.email;
      return userMail.includes(keyPress);
    });
    this.setState({ searchResults: searchResults });
    }
  };

  render() {
    return (
      <Modal
        isOpen
        style={customStyles}
        contentLabel="Invite Contacts Modal"
        ariaHideApp={false}
      >
          <SearchStyles>
            <input
              type="search"
              name="findGoogleContacts"
              placeholder="Search your Google Contact"
              id="search"
              onChange={this.onChange}
              //   className= {this.state.loading ? 'loading' : '' }
            />
            {this.state.searchResults && (
              <DropDown>
                {this.state.searchResults.map((item, index) => (
                  <SingleGoogleContact
                    key={index}
                    data={item}
                    id="googleContact" /*isRequested={this.isRequestSent(item.id)} */
                  />
                ))}
                {!this.state.searchResults.length && (
                  <DropDownItem>
                    {" "}
                    Sorry! Nothing found for "{this.state.inputValue}."
                  </DropDownItem>
                )}
              </DropDown>
            )}
          </SearchStyles>
      </Modal>
    );
  }
}

export default InviteGoogleContacts;
