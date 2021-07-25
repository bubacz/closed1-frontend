import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Pagination from "./Pagination";
import {perPage} from '../../config';
import UserTable from './UserTable';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    users(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      name
      email
      status
      posts {
        id
      }
      permissions
      lastActive
    }
  }
`;

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    usersConnection {
      aggregate {
        count
      }
    }
  }
`;

class GetUsers extends Component {
  render() {
    return (
      <>
        <Pagination
          query={PAGINATION_QUERY}
          pathName="totalUsers"
          values="usersConnection"
          page={this.props.page}
        />
        <Query
          query={ALL_USERS_QUERY}
          fetchPolicy="cache-and-network"
          variables={{
            skip: this.props.page * perPage - perPage,
          }}
        >
          {({ loading, error, data }) => {
            console.log("data", data);
            if (loading) return <h1> loading...</h1>;
            if (data) {
              return <UserTable users={data.users}/>;
            }
          }}
        </Query>
      </>
    );
  }
}

export default GetUsers;
