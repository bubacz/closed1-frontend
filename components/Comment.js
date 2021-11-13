import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CommentReplies from "./CommentReplies";
import Router from "next/router";
import { getTimeSinceComment } from "../lib/DateTimeUtils";

const CommentStyle = styled.div`
	display: contents;
  
	.main-comment {
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

  .replies-section > * {
    margin-bottom: 3rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

	a {
    color: ${props => props.theme.green};
    
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
	}
  
	p {
    display: flex;
    flex-wrap: wrap;
		margin: 2px;
    gap: 1rem;
	}
`;

class Comment extends Component {
	render() {
		const { author, content, replies, createdAt } = this.props.comment;
    return (
      <div className="card">
        <CommentStyle>
          <div className="card-header">
            <div className="main-comment">
              <img src={author.profilePic} />
              <div className="content">
                <div
                  onClick={() => {
                    Router.push(
                      author.id === this.props.me.id
                        ? {
                            pathname: "myProfile"
                          }
                        : {
                            pathname: "/userProfile",
                            query: {
                              id: author.id
                            }
                          }
                    );
                  }}
                >
                  <h4 className="author-name">{author.name}</h4>
                  <p>
                    <span>{content}</span>
                    <span className="time">{getTimeSinceComment(createdAt)}</span>
                  </p>
                  <p>
                    <a
                      onClick={() =>
                        this.props.replyComment(
                          this.props.mainCommentId,
                          author.name
                        )
                      }
                    >
                      reply
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="replies-section">
              <CommentReplies
                replies={replies}
                commentId={this.props.mainCommentId}
                replyComment={this.props.replyComment}
                me={this.props.me}
              />
            </div>
          </div>
        </CommentStyle>
      </div>
		);
	}
}

Comment.defaultProps = {
	author: { id: "", name: "" },
	content: ""
};

Comment.propTypes = {
	author: PropTypes.object,
	content: PropTypes.string
};

export default Comment;
