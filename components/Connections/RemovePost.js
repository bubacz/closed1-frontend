import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Closed1Button from "../styles/Closed1Button";
import LoadingSpinner from "../LoadingSpinner";

const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($id: ID!) {
    deletePost(id: $id){
      id
    }
  }
`;

class RemovePost extends Component {
  render() {
    return (
      <Mutation mutation={DELETE_POST_MUTATION} variables={this.props}>
        {(deletePost, { loading, error }) => (
          <div>
            <Closed1Button
              className="action-button"
              disabled={loading}
              onClick={async (e) => {
                e.preventDefault();
                if (confirm("Are you sure you want to delete Post?")) {
                  await deletePost();
                  window.location.reload();
                }
              }}
            >
              Remove Post
            </Closed1Button>
            <span>{loading && <LoadingSpinner />}</span>
          </div>
        )}
      </Mutation>
    );
  }
}

export default RemovePost;
