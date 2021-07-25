import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Closed1Button from "../styles/Closed1Button";
import Error from "../ErrorMessage";

const DECLINE_CONNECTION_REQUEST = gql`
  mutation DECLINE_CONNECTION_REQUEST($id: ID!) {
    deleteRequest(id: $id) {
      id
    }
  }
`;

const Content = styled.div`
`;

class DeclineConnection extends Component {
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
      <Mutation mutation={DECLINE_CONNECTION_REQUEST} variables={this.state}>
        {(deleteRequest, { error, loading }) => (
          <Content>
            {/* <Error error={error} /> */}
                <Closed1Button
                  className="action-button"
                  onClick={async (e) => {
                    e.preventDefault();
                    await deleteRequest();
                    window.location.reload();
                  }}
                > DECLINE </Closed1Button>
          </Content>
        )}
      </Mutation>
    );
  }
}

export default DeclineConnection;
