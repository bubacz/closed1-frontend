import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Pagination from "./Pagination";
import {perPage} from '../../config';
import ReportedUsersTable from './ReportedUsersTable';

const ALL_REPORTED_USERS_QUERY = gql`
  query ALL_REPORTED_USERS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    reportedUsers(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      user {
        id
        name
        email
      }
      reportedBy{
        id
        name
      }
      reason
      createdAt
    }
  }
`;

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    reportedUsersesConnection {
      aggregate {
        count
      }
    }
  }
`;

class AllReportedUsers extends Component {
  render() {
    return (
      <>
        <Pagination
          query={PAGINATION_QUERY}
          pathName="reportedUsers"
          values="reportedUsersesConnection"
          page={this.props.page}
          name="reported Users"
        />
        <Query
          query={ALL_REPORTED_USERS_QUERY}
          fetchPolicy="cache-and-network"
          variables={{
            skip: this.props.page * perPage - perPage,
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <h1> loading...</h1>;
            if (data) {
              return <ReportedUsersTable users={data.reportedUsers}/>;
            }
          }}
        </Query>
      </>
    );
  }
}

export default AllReportedUsers;
