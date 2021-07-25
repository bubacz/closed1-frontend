import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CommentReplies from "./CommentReplies";
import Router from "next/router";
import { getTimeSinceComment } from "../lib/DateTimeUtils";

const CommentStyle = styled.div`
display: contents;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .main-comment {
    float: left;
    margin: 1rem 1rem 1rem 3rem;
    font-size: 1.6rem;
    display: flex;
  }
  // .replies-section{
  //   display: grid;
  //   grid-auto-rows: 1fr;
  //   grid-auto-flow: row;
  // }
  a:hover{
    cursor: pointer;
    text-decoration: underline;
    color: ${(props) => props.theme.green};
  }
  p{
    margin: 2px;
  }
`;

class Comment extends Component {
  render() {
    const { author, content, replies, createdAt } = this.props.comment;
    return (
        <CommentStyle>
          <div className="main-comment">
           <img src={author.profilePic}/>
            <div className="content">
            <div onClick={()=>{
              Router.push(author.id===this.props.me.id ?{
                pathname: "myProfile",}:{
                pathname: "/userProfile",
                query: {
                  id: author.id,
                }})
               }}>{author.name}</div>
              <div>{content} &emsp;&emsp; {getTimeSinceComment(createdAt)}</div>
              <div><a onClick={()=> this.props.replyComment(this.props.mainCommentId, author.name)}>reply</a></div>
            </div> 
          </div>
          <div className="replies-section">
        <CommentReplies replies={replies} commentId={this.props.mainCommentId} replyComment={this.props.replyComment} me={this.props.me} />
        </div>
        </CommentStyle>
    );
  }
}

Comment.defaultProps = {
  author: { id: "", name: "" },
  content: ""
}

Comment.propTypes = {
  author: PropTypes.object,
  content: PropTypes.string
}

export default Comment;