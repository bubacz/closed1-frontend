import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import Closed1Button from "./styles/Closed1Button";

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

class PostUpdateForm extends Component {
  state = this.props.data;

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Mutation mutation={UPDATE_POST_MUTATION} variables={this.state}>
        {(updatePost, { loading, error }) => (
          <Form
            onSubmit={async (e) => {
              // Stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await updatePost();
              // change them to the single item page
              Router.push({
                pathname: "/posts",
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="company">
                Company
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="content">
                Content
                <textarea
                  type="text"
                  id="content"
                  name="content"
                  placeholder="Content"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </label>
              <Closed1Button type="submit">
                Sav{loading ? "ing" : "e"} Changes
              </Closed1Button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default PostUpdateForm;
