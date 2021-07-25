import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Closed1Button from './styles/Closed1Button';

const REPLY_COMMENT_MUTATION = gql`
  mutation REPLY_COMMENT_MUTATION(
    $content: String!
    $commentId: String!
  ) {
    replyComment(
      content: $content
      commentId: $commentId
    ) {
      id
    }
  }
`;

class ReplyComment extends Component {
  state = {
    content: '',
    commentId: this.props.commentId,
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Mutation mutation={REPLY_COMMENT_MUTATION} variables={this.state}>
        {(replyComment, { loading, error }) => (
          <Form
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const res = await replyComment();
              this.props.onCommentPost(this.state.content, this.props.commentId)
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
                  placeholder={`Reply to ${this.props.author}`}
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

ReplyComment.defaultProps = {
  commentId: ""
}

ReplyComment.propTypes = {
  commentId: PropTypes.string
}

export default ReplyComment;
export { REPLY_COMMENT_MUTATION };
