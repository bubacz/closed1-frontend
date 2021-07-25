import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "../ErrorMessage";
// import styled from "styled-components";
import ProfileTemplate from "./ProfileTemplate";
import LoadingSpinner from "../LoadingSpinner";

export const OTHER_USER_QUERY = gql`
  query OTHER_USER_QUERY($id: String!) {
    userprof(id: $id) {
      id
      email
      profilePic
      coverPic
      name
      permissions
      conversations {
        id
        participants {
          id
        }
      }
      posts {
        id
        company
        content
        likes {
        id
        user {
          id
        }
      }
        createdAt
        updatedAt
        author {
          id
          name
          title
          company
          profilePic
        }
      comments {
          id
          content
          createdAt
          author {
            id
            name
            profilePic
          }
          replies (orderBy: createdAt_ASC){
            id
            content
            createdAt
            author {
              id
              name
              profilePic
            }
          }
        }
        visible
      }
      friends {
        id
      }
      sent {
        id
      }
      received {
        id
      }
      settings
      status
      title
      company
      territory
      targetBuyers
      city
      state
      country
    }
  }
`;

class UsersProfile extends Component {
  render() {
    return (
      <Query
        query={OTHER_USER_QUERY}
        variables={{ id: this.props.userId }}
        fetchPolicy="cache-and-network"
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <LoadingSpinner />;
          if (data) return <ProfileTemplate user={data.userprof} />;
        }}
      </Query>
    );
  }
}

export default UsersProfile;
