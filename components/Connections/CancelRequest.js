import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Closed1Button from "../styles/Closed1Button";
import Error from "../ErrorMessage";

const CANCEL_CONNECTION_REQUEST = gql`
  mutation CANCEL_CONNECTION_REQUEST($id: ID!) {
    cancelRequest(id: $id) {
      id
    }
  }
`;

const Content = styled.div`
a {
  padding-left: 5px;
  color: blue;
  font-size: 12px;
  :hover {
    cursor: pointer;
    font-size: 13px;
    text-decoration: underline;
  }
}
`;

class CancelRequest extends Component {
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
      <Mutation mutation={CANCEL_CONNECTION_REQUEST} variables={this.state}>
        {(cancelRequest, { error, loading }) => (
          <Content>
            <Error error={error} />
                <span><Closed1Button
                  onClick={async (e) => {
                    e.preventDefault();
                    await cancelRequest();
                    window.location.reload();
                  }}
                > Cancel Request </Closed1Button></span>
          </Content>
        )}
      </Mutation>
    );
  }
}

export default CancelRequest;
