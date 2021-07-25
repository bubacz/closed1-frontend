import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Form from "../styles/Form";
import Error from "../ErrorMessage";
import Closed1Button from "../styles/Closed1Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($company: String!, $content: String!) {
    createPost(company: $company, content: $content) {
      id
    }
  }
`;

const PostCreate = styled.div`
  background: white;

  form {
    border: 0;
  }
`;

const EmptyPost = styled.div`
  // display: grid;
  .empty-deal {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      color: #908e8e;
      vertical-align: text-top;
      color: #fff;
    }
  }
`;
class CreatePost extends Component {
  state = {
    company: "",
    content: "",
    createPost: false,
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleClick = () => {
    const { createPost } = this.state;
    this.setState({ createPost: !createPost });
  };

  render() {
    const { createPost } = this.state;
    return (
      <PostCreate>
        {createPost ? (
          <Mutation mutation={CREATE_POST_MUTATION} variables={this.state}>
            {(createPost, { loading, error }) => (
              <Form
                data-test="form"
                onSubmit={async (e) => {
                  // Stop the form from submitting
                  e.preventDefault();
                  // call the mutation
                  const res = await createPost();
                  this.setState({
                    company: "",
                    content: "",
                    createPost: false,
                  })
                  // window.location.reload();
                }}
              >
                <Error error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="content">
                    {this.state.createPost
                      ? "What have you closed?"
                      : "Would u like to post something?"}
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="postInputBox form-control"
                      placeholder="Company Name"
                      required
                      value={this.state.company}
                      onChange={this.handleChange}
                    />

                    <textarea
                      type="text"
                      id="content"
                      name="content"
                      className="postInputBox form-control"
                      placeholder="Information about the deal"
                      required
                      value={this.state.content}
                      onChange={this.handleChange}
                    />
                  </label>

                  {this.state.createPost ? (
                    <div className="d-flex">
                      <Closed1Button className="btn-light col-autofill" onClick={this.handleClick}>
                        Cancel
                      </Closed1Button>
                      <Closed1Button type="submit" className="btn-primary col-autofill">Post</Closed1Button>
                    </div>
                  ) : (
                    <Closed1Button onClick={this.handleClick}>
                      click here to post new deal
                    </Closed1Button>
                  )}
                </fieldset>
              </Form>
            )}
          </Mutation>
        ) : (
          <EmptyPost>
            <div className="empty-deal">
              <Closed1Button onClick={this.handleClick} className="w-100 m-0">
                <FontAwesomeIcon icon={faEdit} width="0" />&nbsp;&nbsp;<span>Post a New Deal</span>
              </Closed1Button>
            </div>
          </EmptyPost>
        )}
      </PostCreate>
    );
  }
}

export default CreatePost;
export { CREATE_POST_MUTATION };
