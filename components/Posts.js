import React, { Component } from "react";
import styled from "styled-components";
import Post from "./Post";

const Center = styled.div`
  
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

class Posts extends Component {
  
  render() {
    const { user, posts } = this.props;
    return (
      <Center>
        <PostsList>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div data-aos="fade-up-left" data-aos-duration="300" key={post.id}>
                <Post post={post}  me={user} />
              </div>
            ))
          ) : (
            <h2>There are no posts for this user</h2>
          )}
        </PostsList>
      </Center>
    );
  }
}

export default Posts;
