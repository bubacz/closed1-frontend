import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Closed1Button from "../styles/Closed1Button";
import Error from "../ErrorMessage";

const REMOVE_CONNECTION_REQUEST = gql`
  mutation REMOVE_CONNECTION_REQUEST($id: ID!, $conversationId: String) {
    removeFriend(id: $id, conversationId: $conversationId) {
      id
    }
  }
`;

const Content = styled.div`
`;

class RemoveFriend extends Component {
  state = {
    id: "",
    conversationId : '',
  };
  componentDidMount() {
    const { userId, conversationId } = this.props;
    if (userId && conversationId) {
      this.setState({ id: userId , conversationId : conversationId });
    }
  }
  componentDidUpdatet(prevProps) {
    const { userId, conversationId} = this.props;
    if (this.props !== prevProps) {
      this.setState({ id: userId , conversationId: conversationId});
    }
  }
  render() {
    return (
      <Mutation mutation={REMOVE_CONNECTION_REQUEST} variables={this.state}>
        {(removeFriend, { error, loading }) => (
          <Content>
            {/* <Error error={error} /> */}
                <Closed1Button
                  onClick={async (e) => {
                    e.preventDefault();
                    await removeFriend();
                    window.location.reload();
                  }}
                >REMOVE</Closed1Button>
          </Content>
        )}
      </Mutation>
    );
  }
}

export default RemoveFriend;
