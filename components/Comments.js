import React, { Component } from "react";
import Comment from "./Comment";
import styled from "styled-components";

const CommentsList = styled.div`
	display: grid;
	padding: 1rem 0;

  .divider {
    opacity: 0.25;
    width: calc(100% - 4rem);
    margin: 0 auto;
  }
`;

class Comments extends Component {
	render() {
		const { commentList, me } = this.props;
		return (
			<CommentsList>
				{commentList.length
					? commentList.map(comment => {
							return (
								<>
									<hr class="divider" />
									<Comment
										me={me}
										key={comment.id}
										comment={comment}
										mainCommentId={comment.id}
										replyComment={this.props.replyComment}
									/>
								</>
							);
					  })
					: ""}
			</CommentsList>
		);
	}
}

export default Comments;
