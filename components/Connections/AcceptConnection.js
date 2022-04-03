import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Closed1Button from "../styles/Closed1Button";
import LoadingSpinner from "../LoadingSpinner";

const ACCEPT_CONNECTION_REQUEST = gql`
  mutation ACCEPT_CONNECTION_REQUEST($id: ID!) {
    createConversation(id: $id) {
      id
      participants {
        id
      }
    },
    acceptRequest(id: $id) {
      id
    }
  }
`;

const Content = styled.div``;

class AcceptConnection extends Component {
  state = {
    id: "",
  };
  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      this.setState({ id: userId });
    }
  }
  componentDidUpdatet(prevProps) {
    const { userId } = this.props;
    if (this.props !== prevProps) {
      this.setState({ id: userId });
    }
  }
  render() {
    return (
      <Mutation mutation={ACCEPT_CONNECTION_REQUEST} variables={this.state}>
        {(acceptRequest, {loading, error}) => (
          <Content>
            {/* <Error error={error} /> */}
            <Closed1Button
              className="action-button"
              disabled={loading}
              onClick={ async (e) => {
                e.preventDefault();
                const accept = await acceptRequest();
                window.location.reload();
              }}
            >
              {" "}
              ACCEPT{" "}
            </Closed1Button><span>
            {loading ? <LoadingSpinner /> : ''}</span>
          </Content>
        )}
      </Mutation>
    );
  }
}

export default AcceptConnection;
