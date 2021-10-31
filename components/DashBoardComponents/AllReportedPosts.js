import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Pagination from "./Pagination";
import {perPage} from '../../config';
import ReportedPostsTable from './ReportedPostsTable';

const ALL_REPORTED_POSTS_QUERY = gql`
  query ALL_REPORTED_POSTS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    reportedPosts(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      post {
        id
        content
        company
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
    reportedPostsesConnection {
      aggregate {
        count
      }
    }
  }
`;

class AllReportedPosts extends Component {
  render() {
    return (
      <>
        <Pagination
          query={PAGINATION_QUERY}
          pathName="reportedUsers"
          values="reportedPostsesConnection"
          page={this.props.page}
          name="reported Users"
        />
        <Query
          query={ALL_REPORTED_POSTS_QUERY}
          fetchPolicy="cache-and-network"
          variables={{
            skip: this.props.page * perPage - perPage,
          }}
        >
          {({ loading, data }) => {
            if (loading) return <h1> loading...</h1>;
            if (data) {
              const reportedPosts = data.reportedPosts.filter(record => record.post);
              return <ReportedPostsTable users={reportedPosts}/>;
            }
          }}
        </Query>
      </>
    );
  }
}

export default AllReportedPosts;
