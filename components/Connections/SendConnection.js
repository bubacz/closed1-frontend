import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Closed1Button from "../styles/Closed1Button";
import Error from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";

const SEND_CONNECTION_REQUEST = gql`
  mutation SEND_CONNECTION_REQUEST($id: ID! ,$senderName: String!, $receiverName: String, $receiverEmail: String) {
    sendRequest(id: $id ,senderName: $senderName, receiverName: $receiverName, receiverEmail: $receiverEmail) {
      id
    }
  }
`;

const Content = styled.div``;

class SendConnection extends Component {
  render() {
    const{ user, me} = this.props;
    return (
      <Mutation mutation={SEND_CONNECTION_REQUEST} variables={{id:user.id, senderName: me.name, receiverName: user.name, receiverEmail: user.email}}>
        {(sendRequest, { error, loading }) => (
          <Content>
            {loading ? <LoadingSpinner /> : ""}
            <Error error={error} />
            <Closed1Button
              disabled={loading}
              onClick={async (e) => {
                e.preventDefault();
                await sendRequest();
                window.location.reload();
              }}
            >
              {" "}
              Connect{" "}
            </Closed1Button>
          </Content>
        )}
      </Mutation>
    );
  }
}

export default SendConnection;
