import React, { Component } from "react";
import styled from "styled-components";
import Router from "next/router";
import User from "../Assets/user.png";
import { getTimeSince } from "../lib/DateTimeUtils";

const UserInfo = styled.div`
  .user-info {
    display: flex;
    align-items: center;

    .user {
      font-size: 1.6rem;
      line-height: 1.5;
      text-align: left;
    }
    .user-photo {
      width: 60px;
      height: 60px;
      margin-right: 1rem;
      border: 1px solid ${props=> props.theme.lightgreen};
      border-radius: 50%;
    }

    .user-name {
      cursor: pointer;
      :hover {
        color: ${(props) => props.theme.green};
      }
    }
    .user-role {
      font-size: 12px;
      width: 15rem;
      opacity: 80%;
      color: ${(props) => props.theme.green};
    }
  }
  .post-status {
    line-height: 1;
    .time-stamp {
      opacity: 70%;
      font-size: 12px;
    }
    .likes {
      font-size: 12px;
    }
  }
`;

class PostUserInfo extends Component {
  handleClick = (id) => {
    const { isMyPost } = this.props;
    if (!isMyPost) {
      Router.push({
        pathname: "/userProfile",
        query: { id: id },
      });
    } else {
      Router.push({
        pathname: "/myProfile",
      });
    }
  };
  render() {
    const { post, likesCount } = this.props;
    return (
      <UserInfo>
        <div className="user-info">
          <img className="user-photo" src={post.author.profilePic || User} />
          <div className="user">
            <div
              className="user-name"
              onClick={() => {
                this.handleClick(post.author.id);
              }}
            >
              {post.author.name}
            </div>
            {post.author.title || post.author.company ? (
              <div className="user-role">
                {post.author.title} @ {post.author.company}
              </div>
            ) : (
              ""
            )
            }
            <div className="post-status">
              <span className="time-stamp">
                posted {getTimeSince(post.createdAt)} &emsp;
              </span>
              <span className="likes">{likesCount} Likes</span>
            </div>
          </div>{" "}

        </div>
      </UserInfo>
    );
  }
}

export default PostUserInfo;
