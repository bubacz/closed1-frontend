import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";
import Link from "next/link";
import Router from "next/router";
import LoadingSpinner from "./LoadingSpinner";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $refer: ID!
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password, refer: $refer) {
      id
    }
    # createConversation(id: $refer) {
    #   id
    #   participants {
    #     id
    #   }
    # }
  }
`;

export const MainForm = styled.div`
  display: block;
  width: 60%;
  padding: 1rem;
  justify-self: center;

  h2 {
    text-align: center;
  }

  a {
    color: blue;
    text-decoration: underline;
    :hover {
      cursor: pointer;
    }
  }

  .error {
    color: red;
  }
  button {
    :hover {
      cursor: pointer;
    }
  }
  .check-area {
    vertical-align: super;
  }
`;

class Signup extends Component {
  state = {
    refer: "",
    name: "",
    email: "",
    password: "",
    errors: "",
  };

  componentDidMount() {
    const { referId, email } = this.props.urlProps;
    if (referId) {
      this.setState({ refer: referId, email: email });
    }
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState({ errors: "" });
    });
  };

  handleFields = (value) => {
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    // console.log('value', value.includes('@'));
    // switch (name) {
    //   case 'name':
    //     errors.fullName =
    //       value.length < 8
    //         ? 'Name must be at least 5 characters long!'
    //         : '';
    //     break;
    //   case 'email':
    if (value.length > 6) {
      if (validEmailRegex.test(value)) {
        this.setState({ errors: "" });
        return true;
      } else {
        this.setState({ errors: "Please Enter a valid email" });
        return false;
      }
    }
  };

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  render() {
    const { errors } = this.state;
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => {
          if (loading) return <LoadingSpinner />;
          return (
            <MainForm>
              <Form
                // method="post"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const valid = this.handleFields(this.state.email);
                  if (valid) {
                    await signup();
                    Router.push({
                      pathname: "/activateMessage",
                    });
                  }
                }}
              >
                {/* <fieldset disabled={loading} aria-busy={loading}> */}
                <h2>Sign Up for An Account</h2>
                <Error error={error} />
                {errors ? <span className="error">{errors}</span> : ""}
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    required
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                  {/* {errors.email.length > 0 && 
                   <span className='error'>{errors.email}</span>} */}
                </label>
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    required
                    value={this.state.name}
                    onChange={this.saveToState}
                  />
                  {/* {errors.name.length > 0 && 
                    <span className='error'>{errors.name}</span>} */}
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    required
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <div>
                  <input
                    type="checkbox"
                    id= "agreement"
                    name="agreement"
                    required
                  /> <span className="check-area">accept terms of use <Link href="/termsofuse">
                  <a>See user agreement</a>
                </Link> & <Link href="/privacypolicy">
                  <a>PrivacyPolicy</a>
                </Link></span>
                </div>
                <button type="submit">Sign Up!</button>
                {/* </fieldset> */}
                Login using existing account?&nbsp;&nbsp;
                <Link href="/">
                  <a>Click Here</a>
                </Link>
              </Form>
            </MainForm>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };
