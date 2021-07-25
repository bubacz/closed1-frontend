import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "./ErrorMessage";
import styled from "styled-components";
import Head from "next/head";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import { canComment, canViewPost } from "../lib/genUtils";
import Format from "./Format";
import Closed1Button from "./styles/Closed1Button";
import { CURRENT_USER_QUERY } from "../Queries/Me";
import ProfileHeader from "./ProfileSection/ProfileHeader";
import LoadingSpinner from "../components/LoadingSpinner";

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
  query SINGLE_POST_QUERY($id: ID!) {
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
                  return (
                    <>
                      {canViewPost(me, post.author) && (
                        <>
                          <SinglePostStyles>
                            <Head>
                              <title>Closed1 | {post.id}</title>
                            </Head>
                            <div className="details">
                              <h2>{post.author.name}</h2>
                              <p>Deal closed at {post.company}</p>
                              <p>{post.content}</p>
                              <p>
                                <Format formatter={this.formatDate}>
                                  {post.createdAt}
                                </Format>
                              </p>
                            </div>
                          </SinglePostStyles>
                          {canComment(me, post.author) && (
                            <CreateComment postId={this.props.id} />
                          )}
                          <Comments commentList={post.comments} />
                        </>
                      )}
                      {!canViewPost(me, post.author) && (
                        <>
                          <SinglePostStyles>
                            <Head>
                              <title>Closed1 | Add {post.author.name}</title>
                            </Head>
                            <div className="details">
                              {/* <Center> */}
                              <ProfileHeader user={post} />
                              {/* <p>You are not connected to {post.author.name}!</p>
                          <Closed1Button>Connect with {post.author.name}</Closed1Button> */}
                              {/* </Center> */}
                            </div>
                          </SinglePostStyles>
                        </>
                      )}
                    </>
                  );
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
