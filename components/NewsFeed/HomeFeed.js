import React, { Component } from "react";
import styled from "styled-components";
// import { useSpring, animated } from "react-spring";
import Posts from "../Posts";
import ContactCard from "../OwnContactCard";
import CreatePost from "./CreatePost";

const HomeScreen = styled.div`
  .footer {
    background: white;
  }
`;

const HomeFeed = (props) => {
  const { user, posts } = props;
  props.subscribeToNewPosts();
  // const springProps = useSpring({to:{opacity: 1}, from:{opacity: 0}, duration: 5000});
  return (
    // <animated.div style={springProps}>
    <HomeScreen className="grid-template">
      <div  data-aos="fade-up-right" data-aos-duration="300" className="scrollable sidebar flex-single-column">
        <ContactCard user={user} />
        <CreatePost />
      </div>
      <div className="scrollable content flex-single-column">
        <Posts user={user} posts={posts} />
      </div>
    </HomeScreen>
    // </animated.div>
  );
};
export default HomeFeed;
