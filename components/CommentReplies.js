import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getTimeSinceComment } from "../lib/DateTimeUtils";
import Router from "next/router";

const CommentRepliesStyle = styled.div`
  float: right;
  display:grid;
  grid-auto-rows: 1fr;
  grid-auto-flow: rows;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .reply-details {
    float: right;
    margin: 1rem 1rem 1rem 3rem;
    font-size: 1.6rem;
    display: grid;
  }
  a:hover{
    cursor: pointer;
    text-decoration: underline;
    color: ${props=> props.theme.green};
  }
`;

class CommentReplies extends Component {

  render() {
    const { replies, me } = this.props;
    return  <div> 
      {replies.length ?
      replies.map((reply, index) => { 
        return  <CommentRepliesStyle key={index}>
        <div><div className="reply-details">
          <img src={reply.author.profilePic}/>
          <div onClick={()=>{
            Router.push(reply.author.id===me.id ?{
            pathname: "myProfile"}:{
            pathname: "/userProfile",
            query: {
              id: author.id,
            }})
            }}>{reply.author.name} </div>
          <p>{reply.content} &emsp; {getTimeSinceComment(reply.createdAt)}</p>
          <p><a onClick={()=> this.props.replyComment(this.props.commentId, reply.author.name)}>reply</a></p>
        </div>
      </div>
  </CommentRepliesStyle>}): ''}</div>
  }
}

CommentReplies.defaultProps = {
  author: { id: "", name: "" },
  content: ""
}

CommentReplies.propTypes = {
  author: PropTypes.object,
  content: PropTypes.string
}

export default CommentReplies;