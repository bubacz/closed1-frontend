import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "./ErrorMessage";
import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import PostStyles from "./styles/PostStyles";
import PostUserInfo from "./PostUserInfo";
import { canComment, canViewPost } from "../lib/genUtils";
import Format from "./Format";
import Closed1Button from "./styles/Closed1Button";
import { CURRENT_USER_QUERY } from "../Queries/Me";
import ProfileHeader from "./ProfileSection/ProfileHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import Post from "./Post";

const SinglePostStyles = styled.div`
  margin: 2rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const Main = styled.div`
  width: 60%;
  padding: 1rem;
  position: relative;
  left: 20%;
`;

const Button = styled.button`
  padding: 1rem;
  color: white;
  background-color: ${(props) => props.theme.green};
  font-size: 2rem;
  font-weight: 600;
  border: 0;
  box-shadow: none;
  border-radius: 0px;
`;

const SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: String!) {
    post(id: $id) {
      id
      content
      likes {
        user {
          id
          name
        }
      }
      author {
        id
        name
        friends {
          id
        }
      }
      company
      comments {
        id
        author {
          id
          name
        }
        content
      }
      visible
      createdAt
    }
  }
`;

class SinglePost extends Component {
  formatDate = (dateString) => {
    return dateString.replace(/(\d{4})-(\d{2})-(\d{2}).+/gi, "$2/$3/$1");
  };

  render() {
    return (
      <Main>
        <Query query={CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
          {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <LoadingSpinner />;
            if (!data) return <p>No User Found!</p>;
            const { me } = data;
            return (
              <Query
                query={SINGLE_POST_QUERY}
                fetchPolicy="cache-and-network"
                variables={{
                  id: this.props.id,
                }}
              >
                {({ error, loading, data }) => {
                  if (error) return <Error error={error} />;
                  if (loading) return <LoadingSpinner />;
                  if (!data.post)
                    return <p>No Post Found for {this.props.id}</p>;
                  const { post } = data;
                  return <> {canViewPost(me, post.author) ? <Post me={me} post={post} /> :
                    <h3>You are not friends with <Link
                      href={me.id === post.author.id ? "/myProfile" : `/userProfile?id=${post.author.id}`}
                    >
                      {post.author.name}
                    </Link> to view this post</h3>}</>
                }}
              </Query>
            );
          }}
        </Query>
      </Main>
    );
  }
}

export default SinglePost;
export { SINGLE_POST_QUERY };
