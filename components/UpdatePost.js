import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { SINGLE_POST_QUERY } from "./SinglePost";
import PostUpdateForm from "./PostUpdateForm";
import { AddContactStyle } from "./CreateContact";
import LoadingSpinner from "../components/LoadingSpinner";

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION(
    $company: String!
    $content: String!
    $id: ID!
  ) {
    updatePost(company: $company, content: $content, id: $id) {
      company
      content
      id
    }
  }
`;

class UpdatePost extends Component {
  state = {
    id: this.props.id,
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  // updatePost = async (e, updatePostMutation) => {
  //   e.preventDefault();
  //   console.log('Updating Item!!');
  //   console.log(this.state);
  //   const res = await updatePostMutation();
  //   console.log('Updated!!');
  // };

  render() {
    return (
      <AddContactStyle>
        <Query
          query={SINGLE_POST_QUERY}
          variables={{
            id: this.props.id,
          }}
          fetchPolicy="cache-and-network"
        >
          {({ data, loading }) => {
            if (loading) return <LoadingSpinner />;
            if (!data.post) return <p>No Item Found for ID {this.props.id}</p>;
            return <PostUpdateForm data={data.post} />;
          }}
        </Query>
      </AddContactStyle>
    );
  }
}

export default UpdatePost;
export { UPDATE_POST_MUTATION };
