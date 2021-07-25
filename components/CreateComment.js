import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Closed1Button from './styles/Closed1Button';

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION(
    $content: String!
    $postId: String!
  ) {
    createComment(
      content: $content
      postId: $postId
    ) {
      id
    }
  }
`;

class CreateComment extends Component {
  state = {
    content: '',
    postId: this.props.postId,
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Mutation mutation={CREATE_COMMENT_MUTATION} variables={this.state}>
        {(createComment, { loading, error }) => (
          <Form
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const res = await createComment();
              console.log("response", res);
              this.props.onCommentPost(this.state.content, res.data.createComment.id);
              this.setState({content: ''})
              // change them to the single item page
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="content">
                <input
                  type="text"
                  id="content"
                  name="content"
                  className="commentInputBox"
                  placeholder="What do you want to say?"
                  required
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </label>
              <Closed1Button type="submit">Comment</Closed1Button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

CreateComment.defaultProps = {
  postId: ""
}

CreateComment.propTypes = {
  postId: PropTypes.string
}

export default CreateComment;
export { CREATE_COMMENT_MUTATION };
