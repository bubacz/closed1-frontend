import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import ClosedModal from "./ClosedModal";
import { CURRENT_USER_QUERY } from "./User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

const ResetForm = styled.div`
  display: block;
  width: 50%;
  padding: 1rem;
  position: fixed;
  left: 25%;
  justify-self: center;
  button {
    float: none;
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };
  state = {
    password: "",
    confirmPassword: "",
    response: false,
  };
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <ResetForm>
        <Mutation
          mutation={RESET_MUTATION}
          variables={{
            resetToken: this.props.resetToken,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
          }}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(reset, { error, loading }) => (
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await reset();
                if (res) {
                  this.setState({
                    password: "",
                    confirmPassword: "",
                    response: true,
                  });
                }
                console.log("response", res);
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Your Password</h2>
                <Error error={error} />
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>

                <label htmlFor="confirmPassword">
                  Confirm Your Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>

                <button type="submit">Reset Your Password!</button>
              </fieldset>
            </Form>
          )}
        </Mutation>
        <ClosedModal isOpen={this.state.response} />
      </ResetForm>
    );
  }
}

export default Reset;
