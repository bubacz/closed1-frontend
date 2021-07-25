import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Router from 'next/router';
import LoadingSpinner from './LoadingSpinner';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const SignOut = props => (
  <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {(signout,{error, loading}) =>{
      if(loading) return <LoadingSpinner />;
    return <button onClick={async(e)=>{
      e.preventDefault();
      await signout();
      Router.push(
        {
          pathname: "/",
        })
    }} >Sign Out</button>
    }}
  </Mutation>
);
export default SignOut;
