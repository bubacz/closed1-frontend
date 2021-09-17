import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Form from './styles/Form';
import LoadingSpinner from "./LoadingSpinner";
import { Router } from "next/router";

const SUBSCRIPTION_CANCEL_MUTATION = gql`
  mutation SUBSCRIPTION_CANCEL_MUTATION($customer: String) {
    cancelSubscription (customer :$customer){
      id
      name
      status
      stripeId
    }
  }
`;

class CancelSubscription extends Component {
  render() {
    return (
      <Mutation mutation={SUBSCRIPTION_CANCEL_MUTATION} variables={this.props}>
        {(cancelSubscription, loading) => {
         return <Form
          onSubmit={ async(e) =>{
            e.preventDefault();
            const res = await cancelSubscription();
            Router.push(
              {
              pathname: '/myProfile'
            })
          }}> <h2>Great!! You are Subscribed Member to Closed One</h2>
            <p> <button>cancel Payment</button>
            </p>
          </Form>
  }}
      </Mutation>
    );
  }
}
export default CancelSubscription;
