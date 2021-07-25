import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { OTHER_USER_QUERY } from '../ProfileSection/UsersProfile';
import Messenger from "./Messenger";
import { withRouter } from "next/router";
import LoadingSpinner from "../LoadingSpinner";


const GET_LIST = gql`
  query {
    me {
      id
      conversations {
        id
      }
    }
  }
`;

export const GET_CONVERSATIONS_QUERY = gql`
  query GET_CONVERSATIONS_QUERY($id: String!) {
    conversation(id: $id) {
      id
      participants {
        id
      }
      messages {
        id
        author { id }
        content
        createdAt
      }
    }
  }
`;

const GetConversations = withRouter(props =>  {
  return (
  <Query query={GET_LIST} fetchPolicy="cache-and-network">
  {({ error, loading, data }) => {
    let convos = [];
    if(loading) return <LoadingSpinner />;
    if(data) {
    const info = data.me;
    return info.conversations.map((conversation) => (
      <Query query={GET_CONVERSATIONS_QUERY} variables={conversation} fetchPolicy="cache-and-network" key={conversation.id}>
        {({ error, loading, data }) => {
          if(loading) return <LoadingSpinner />;
          if (data) {
          const conversationinfo = data.conversation;
          const friend = conversationinfo.participants.filter(obj => {
            return obj.id !== info.id;
          });
            return (
            <Query query={OTHER_USER_QUERY} variables={friend[0]} /* fetchPolicy="network-only" */>
              {({ error, loading, data }) => {
                if(loading) return <LoadingSpinner />;
                if (data) {
                const { userprof } = data;
                const merged = {...userprof, ...conversationinfo }; 
                convos.push(merged);
                const length = info.conversations.length;
                if(info.conversations[length-1] === conversation) {
                  
                 return <Messenger user={props.router.query.name} conversations = {convos} me={info.id} />
                }
                }
                return null;
              }}
            </Query> 
          );
        }
        return null;
        }}
      </Query>
    ));
  }
  return null;
  }}
  </Query>
 )
  });
  export default GetConversations;