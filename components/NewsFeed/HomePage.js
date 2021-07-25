import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../../Queries/Me";
import POST_ADDED_SUBSCRIPTION from "./PostSubscription";
import LoadingSpinner from "../LoadingSpinner";
import HomeFeed from "./HomeFeed";
import styled from "styled-components";
import { motion } from "framer-motion";

export const ALL_POSTS_QUERY = gql`
  query {
    posts(orderBy: createdAt_DESC) {
      id
      company
      content
      likes {
        id
        user {
          id
        }
      }
      createdAt
      updatedAt
      author {
        id
        name
        title
        company
        profilePic
        friends {
          id
        }
      }
      comments {
          id
          content
          createdAt
          author {
            id
            name
            profilePic
          }
          replies (orderBy: createdAt_ASC){
            id
            content
            createdAt
            author {
              id
              name
              profilePic
            }
          }
        }
      visible
    }
  }
`;

const HoverButton = styled.button`
    position: fixed;
    left: 50%;
    top: 2rem;
    font-size: 14px;
    width: 30rem;
    height: 3rem;
    border: 1px solid ${props=> props.theme.green};
    border-radius: 5px;
    background: #f5f5f5;
    z-index:1;
    box-shadow: 0px 0px 16px 2px ${props=> props.theme.lightgreen};
    :hover {
      cursor: pointer;
      background: ${props=> props.theme.lightgreen};
      border: none;
      font-size: 16px;
      font-weight: bold;
      color: white;
    }
  }`;

class HomePage extends Component {
  state = {
    displayUpButton: false,
  };
  handleScrollToStats = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    this.setState({ displayUpButton: false});
  };
  render() {
    // console.log("scroll position", window.pageYOffset);
    return (
      <Query query={CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <LoadingSpinner />;
          if (!data.me) return <p>No User Found</p>;
          const user = data.me;
          return (
            <Query query={ALL_POSTS_QUERY} fetchPolicy="cache-and-network">
              {({ data, error, loading, subscribeToMore }) => {
                if (loading) return <LoadingSpinner />;
                if (error) return <p>Error: {error.message}</p>;
                if (!data) return <p>No posts.</p>;
                return (
                  <div>
                    {this.state.displayUpButton ? (
                     <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { scale: 0.6, opacity: 0 },
                          visible: { scale: 1, opacity: 1, transition: { delay: .4 } },
                        }}
                      > 
                      <HoverButton onClick={this.handleScrollToStats}>
                        New Posts Click Here to checkout &#8593;
                      </HoverButton></motion.div>
                    ) : null}
                    <HomeFeed
                      user={user}
                      posts={data.posts}
                      subscribeToNewPosts={() =>
                        subscribeToMore({
                          document: POST_ADDED_SUBSCRIPTION,
                          fetchPolicy: "network-only",
                          variables: {},
                          updateQuery: (prev, { subscriptionData }) => {
                            if (!subscriptionData.data) return prev;
                            if (subscriptionData.data) {
                              const newPost = subscriptionData.data.posts.node;
                              const authorFriends = newPost.author.friends.map(
                                (a) => a.id
                              );
                              const isMyFriendPost = authorFriends.includes(
                                user.id
                              );
                              const isMyPost = newPost.author.id === user.id;
                              if(isMyFriendPost & window.pageYOffset>500){
                                this.setState({ displayUpButton: true});
                              }
                              if (isMyPost || isMyFriendPost) {
                                let newPosts = prev.posts;
                                newPosts.unshift(newPost);
                                return { ...prev, posts: newPosts };
                              }
                            }
                          },
                        })
                      }
                    />
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}
export default HomePage;
