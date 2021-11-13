import React, { Component } from "react";
import PaymentForm from "./PaymentForm";
import CancelSubscription from "./CancelSubscription";
import { CURRENT_USER_QUERY } from "../Queries/Me";
import LoadingSpinner from "./LoadingSpinner";
import { Query } from "react-apollo";
import styled from 'styled-components';

const SubscriptionPage = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  
  button {
    float: none;
  }
`

class ModifySubscription extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
        {({ data, loading, error }) => {
          const user = data.me;
          if (loading) return <LoadingSpinner />;
          return <SubscriptionPage>
            {user.status === "FREE" ? <PaymentForm /> : <CancelSubscription customer={user.subscriptionId}/>}
          </SubscriptionPage>
        }}
      </Query>
    );
  }
}
export default ModifySubscription;
