import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import Router from "next/router";

const ACTIVATE_ACCOUNT_MUTATION = gql`
  mutation ACTIVATE_ACCOUNT_MUTATION($userId: ID, $email: String!, $password: String!) {
    activateUser(userId: $userId, email: $email, password: $password) {
      id
      email
      name
    }
  }
`;


class ActivateAccount extends Component {
  state = {
    userId: "",
    password: "",
    email: "",
  };

  componentDidMount(){
    const { id }= this.props
    if(id){
      this.setState({userId: id})
    }
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if(this.props.id){
    return (
        <Mutation
          mutation={ACTIVATE_ACCOUNT_MUTATION}
          variables={this.state}
          // refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(activation, { error, loading }) => (
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await activation();
                Router.push({
                  pathname: "/myProfile",
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Activate your account</h2>
                <Error error={error} />
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>

                <button type="submit">Activate</button>
              </fieldset>
            </Form>
          )}
        </Mutation>
    );}
    else return <h1>Invalid Activation Token</h1>;
  }
}

export default ActivateAccount;
