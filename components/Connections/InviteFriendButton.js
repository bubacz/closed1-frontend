import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Closed1Button from "../styles/Closed1Button";
import Error from "../ErrorMessage";

const INVITE_FRIEND_MUTATION = gql`
  mutation INVITE_FRIEND_MUTATION($email: String) {
    inviteFriend(email: $email) {
      id
    }
  }
`;
const Content = styled.div``;

class InviteFriendButton extends Component {
  state = {
    email: "",
  };
  componentDidMount() {
    const { email } = this.props;
    if (email) {
      this.setState({ email: email });
    }
  }
  componentDidUpdate(prevProps) {
    const { email } = this.props;
    if (this.props !== prevProps) {
      this.setState({ email: email });
    }
  }

  render() {
    return (
      <Mutation mutation={INVITE_FRIEND_MUTATION} variables={this.state}>
        {(sendRequest, { error, loading }) => (
          <Content>
            <Error error={error} />
            <Closed1Button
              onClick={async (e) => {
                e.preventDefault();
                await sendRequest();
                window.location.reload();
              }}
            >
              Send Invite
            </Closed1Button>
          </Content>
        )}
      </Mutation>
    );
  }
}

export default InviteFriendButton;
