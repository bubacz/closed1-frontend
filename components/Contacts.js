import React, { Component } from "react";
import Router from "next/router";
import Modal from "react-modal";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Contact from "./Contact";
import LoadingSpinner from "../components/LoadingSpinner";
import { perPage } from "../config";
import PleaseSignIn from "./PleaseSignIn";
import Closed1Button from "./styles/Closed1Button";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus as faPlus } from "@fortawesome/free-solid-svg-icons";
import ContactsLimitReached from "./ContactsLimitReached";

const ALL_CONTACTS_QUERY = gql`
  query ALL_CONTACTS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    contacts(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      description
      email
      name
      title
      company
      contactPic
      createdAt
      owner {
        id
        name
      }
      phone
    }
  }
`;

const Center = styled.div`
  max-width: 768px;
  margin: 0 auto;

  .header {
    display: flex;
    align-items: center;
  }
  .header button {
    flex-grow: 1;
  }
`;

const ContactList = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;

const customStyles = {
  content: {
    width: "60%",
    height: "60%",
    top: "10%",
    left: "25%",
    background: '#eeeeee',
    border: "2px solid #69ddd1",
  },
};

class Contacts extends Component {
  state = {
    keyword: "",
    filteredContacts: "",
    sortValue: "",
    isModalOpen: false,
  };

  handleChange = (e) => {
    this.setState({ keyword: e.target.value });
  };

  stringSort = (a, b, category) => {
    let fa = a[category].toLowerCase(),
      fb = b[category].toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  };

  sortContacts = (contacts) => {
    const { sortValue } = this.state;
    switch (sortValue) {
      case "recent to oldest":
        return contacts;
      case "oldest to recent":
        return contacts.sort((a, b) => {
          return a.createdAt.localeCompare(b.createdAt);
        });
      case "Name":
        return contacts.sort((a, b) => this.stringSort(a, b, "name"));
      case "Company":
        return contacts.sort((a, b) => this.stringSort(a, b, "company"));
      case "Title":
        return contacts.sort((a, b) => this.stringSort(a, b, "title"));
      default:
        return contacts;
    }
  };

  getContacts = (contacts) => {
    const { keyword } = this.state;
    const sortedContacts = this.sortContacts(contacts);
    //search function
    if (keyword) {
      const filteredContacts = sortedContacts.filter((contact) => {
        if (
          contact.name.toLowerCase().includes(keyword.toLowerCase()) ||
          contact.company.toLowerCase().includes(keyword.toLowerCase()) ||
          contact.title.toLowerCase().includes(keyword.toLowerCase())
        ) {
          return contact;
        }
      });
      return filteredContacts;
    }
    return sortedContacts;
  };

  handleAddContact = (contacts) => {
   if(contacts.length === 5 ){this.setState({ isModalOpen: true})}
    else { Router.push({ pathname: "/addContact" })}
  };

  render() {
    return (
      <PleaseSignIn>
        <Query
          query={ALL_CONTACTS_QUERY}
          fetchPolicy="cache-and-network"
          variables={{
            skip: this.props.page * perPage - perPage,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <LoadingSpinner />;
            if (error) return <p>Error: {error.message}</p>;
            if (!data) return <p>No contacts.</p>;
            const contacts = this.getContacts(data.contacts);
            return (
              <Center>
                <div className="header">
                  {/* <h2>Contacts</h2> */}
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search By Name, Title & Company"
                    onChange={this.handleChange}
                    value={this.state.keyword}
                  />
                  <select
                    className="form-control"
                    value={this.state.sortValue}
                    onChange={(e) => {
                      this.setState({ sortValue: e.target.value });
                    }}
                  >
                    <option value="recent to oldest">recent to oldest</option>
                    <option value="oldest to recent">oldest to recent</option>
                    <option value="Name">Name</option>
                    <option value="Company">Company</option>
                    <option value="Title">Title</option>
                  </select>
                    <Closed1Button onClick={() => this.handleAddContact(data.contacts)}>
                      <FontAwesomeIcon icon={faPlus} />
                      &nbsp;&nbsp;Add Contact
                    </Closed1Button>
                </div>
                <ContactList>
                  {contacts.map((contact) => {
                    return (
                      <Contact
                        key={contact.id}
                        contact={contact}
                        me={contact.owner}
                      />
                    );
                  })}
                </ContactList>
              </Center>
            );
          }}
        </Query>

      <Modal isOpen={this.state.isModalOpen} style={customStyles} ariaHideApp={false}>
      <ContactsLimitReached/>
       <Closed1Button onClick={()=>this.setState({ isModalOpen: false})}>Close</Closed1Button>
      </Modal>
      </PleaseSignIn>
    );
  }
}

export default Contacts;
export { ALL_CONTACTS_QUERY };
