import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getTimeSinceComment } from "../lib/DateTimeUtils";
import Router from "next/router";

const CommentRepliesStyle = styled.div`
	display: grid;
	grid-auto-rows: 1fr;
	grid-auto-flow: rows;

	.reply-details {
		padding-left: 3rem;
		display: flex;

		img {
			width: 50px;
			height: 50px;
      margin: .5rem 1rem 0 0;
			border-radius: 50%;
			object-fit: cover;
		}
	}

  .author-name {
    margin: 0;
    color: #26A69A;
    font-weight: normal;
  }

  .time {
    opacity: 0.5;
  }

  a {
    color: ${props => props.theme.green};
    
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

`;

class CommentReplies extends Component {
	render() {
		const { replies, me } = this.props;
		return (
			<>
				{replies.length
					? replies.map((reply, index) => {
							return (
								<CommentRepliesStyle key={index}>
									<div className="reply-details">
										<img src={reply.author.profilePic} />

										<div
											onClick={() => {
												Router.push(
													reply.author.id === me.id
														? {
																pathname:
																	"myProfile"
														  }
														: {
																pathname:
																	"/userProfile",
																query: {
																	id: author.id
																}
														  }
												);
											}}
										>
											<h4 className="author-name">{reply.author.name}</h4>
											<p>
												<span>
													{reply.content}
												</span>
												<span className="time">
													{getTimeSinceComment(
														reply.createdAt
													)}
												</span>
											</p>
											<p>
												<a
													onClick={() =>
														this.props.replyComment(
															this.props
																.commentId,
															reply.author.name
														)
													}
												>
													reply
												</a>
											</p>
										</div>
									</div>
								</CommentRepliesStyle>
							);
					  })
					: ""}
			</>
		);
	}
}

CommentReplies.defaultProps = {
	author: { id: "", name: "" },
	content: ""
};

CommentReplies.propTypes = {
	author: PropTypes.object,
	content: PropTypes.string
};

export default CommentReplies;
