import React, { Component } from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
import { isOwner } from '../lib/genUtils';
import Format from './Format';
import { CURRENT_USER_QUERY } from '../Queries/Me';
import LoadingSpinner from "../components/LoadingSpinner";

const SingleContactStyles = styled.div`
  max-width: ${props => props.theme.siteWidth};
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 300px;
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
  a {
    color: ${props => props.theme.green};
  }
  a:hover {
    color: ${props => props.theme.lightgreen};
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

const SINGLE_CONTACT_QUERY = gql`
  query SINGLE_CONTACT_QUERY($id: ID!) {
    contact(id: $id) {
      id
      description
      email
      name
      title
      contactPic
      company
      owner {
        id
        name
      }
      phone
      createdAt
    }
  }
`;

class SingleContact extends Component {
  formatDate = (dateString) => {
    return dateString.replace(/(\d{4})-(\d{2})-(\d{2}).+/ig, '$2/$3/$1');
  }
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <LoadingSpinner />;
          if (!data) return <p>No User Found!</p>;
          const { me } = data;
          return (
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
                if (!data.contact) return <p>No Contact Found for {this.props.id}</p>;
                const { contact } = data;
                console.dir(data);
                return (
                  <>
                  { 
                    isOwner(me.id, contact.owner.id) && <>
                    <SingleContactStyles>
                      <Head>
                        <title>Closed1 | {contact.id}</title>
                      </Head>
                      <div className="details">
                        <h2>Name: &nbsp;{contact.name}</h2>
                        <p>Title: &emsp;&emsp;&emsp;&emsp;{contact.title}</p>
                        <p>Company: &nbsp;&nbsp;&nbsp;&emsp;{contact.company}</p>
                        <p>Email: &emsp;&emsp;&nbsp;&nbsp;&emsp;{contact.email}</p>
                        <p>Phone: &emsp;&emsp;&nbsp;&emsp;{contact.phone}</p>
                        <p>Description: &nbsp;&emsp;{contact.description}</p>
                        <p>Created:  &emsp;&emsp;<Format formatter={this.formatDate}>{contact.createdAt}</Format></p>
                        <Link
                          href='/rolodex'
                        >
                          <a> Back to Rolodex</a>
                        </Link>
                      </div>
                    </SingleContactStyles>
                    </>
                  }
                  { 
                    !isOwner(me.id, contact.owner.id) && <>
                    <SingleContactStyles>
                      <Head>
                        <title>Closed1 | Invalid Contact</title>
                      </Head>
                      <div className="details">
                        <h2>Invalid Contact!</h2>
                        <p>This contact is owned by another user.</p>
                        <Link
                          href='/rolodex'
                        >
                          <a> Back to Rolodex</a>
                        </Link>
                      </div>
                    </SingleContactStyles>
                    </>
                  }
                  </>
                );
                
              }}
            </Query>

          );
        }}
      </Query>
    );
  }
}

export default SingleContact;
export { SINGLE_CONTACT_QUERY };
