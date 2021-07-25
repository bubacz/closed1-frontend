import React, { Component } from "react";
import Comment from "./Comment";
import styled from 'styled-components';

const CommentsList = styled.div`
display: grid;
`;

class Comments extends Component {
  render() {
    const { commentList, me } = this.props;
    return (
      <CommentsList>
        {commentList.length
          ? commentList.map((comment) => {
              return (
                <Comment
                  me={me}
                  key={comment.id}
                  comment={comment}
                  mainCommentId={comment.id}
                  replyComment={this.props.replyComment}
                />
              );
            })
          : ""}
      </CommentsList>
    );
  }
}

export default Comments;
