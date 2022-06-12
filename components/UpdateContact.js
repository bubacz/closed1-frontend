import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import Error from "./ErrorMessage";
import { SINGLE_CONTACT_QUERY } from "./SingleContact";
import { AddContactStyle } from "./CreateContact";
import ContactUpdateForm from './ContactUpdateForm';
import LoadingSpinner from "../components/LoadingSpinner";

const SingleContactStyles = styled.div`
  max-width: ${(props) => props.theme.siteWidth};
  margin: 2rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 300px;
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
  a {
    color: ${(props) => props.theme.green};
  }
  a:hover {
    color: ${(props) => props.theme.lightgreen};
  }
  a::before {
    content: "➜";
    display: inline-block;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }
`;

class UpdateContact extends Component {
  state = {};

  formatDate = (dateString) => {
    return dateString.replace(/(\d{4})-(\d{2})-(\d{2}).+/gi, "$2/$3/$1");
  };

  render() {
    return (
      <AddContactStyle>
        <Query
          query={SINGLE_CONTACT_QUERY}
          fetchPolicy="cache-and-network"
          variables={{
            id: this.props.id,
          }}
        >
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <LoadingSpinner />;
            if (!data.contact)
              return <p>No Contact Found for {this.props.id}</p>;
            const { contact } = data;
            return (<ContactUpdateForm data={contact}/>
            );
          }}
        </Query>
      </AddContactStyle>
    );
  }
}

export default UpdateContact;
