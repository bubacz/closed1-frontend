import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import GoogleContacts from "react-google-contacts";
import InviteGoogleContacts from "./InviteGoogleContacts"
import LoadingSpinner from "./LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";

const MainForm = styled.div`
  text-align: left;

  h2 {
    text-align: center;
  }
  form {
    display: flex;
    place-content: center;
  }
  label {
    width: 75%;
  }
  button {
    margin-top: 2rem;
    margin-bottom: 1rem;
    // align-self: center;
    :hover {
      cursor: pointer;
    }
  }
`;

const INVITE_FRIEND_MUTATION = gql`
  mutation INVITE_FRIEND_MUTATION($email: String) {
    inviteFriend(email: $email) {
      id
    }
  }
`;

class InviteFriend extends Component {
  state = {
    email: "",
    errors: "",
    contactsModal: false,
    completionStatus: false,
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState({ errors: "" });
    });
  };

  handleFields = (value) => {
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
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

  responseCallback = (response) => {
    // console.log(response);
    if(response.length>0){
      this.setState({contactsModal: true, googleContacts: response})
      // console.log('now we can navigate');
    }
  }

  render() {
    const { errors, completionStatus } = this.state;
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { scale: 0.6, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { delay: 0.3 } },
        }}
      >
      <Mutation mutation={INVITE_FRIEND_MUTATION} variables={this.state}>
        {(invite, { error, loading }) => {
          if (loading) return <LoadingSpinner />;
          return (
            <MainForm>
              <h2>Invite Your Friends via Email</h2>
              <Error error={error} />
              {errors ? <span style={{ color: "red" }}>{errors}</span> : ""}
              {completionStatus ? <span style={{ color: "black" }}>Success! Invitation Email Sent to your Closed1</span> : ""}
              <Form
                // method="post"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const valid = this.handleFields(this.state.email);
                  if (valid) {
                    const response = await invite();
                    this.setState({email: '', completionStatus: true});
                  }
                }}
              >
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
                </label>
                <button type="submit">Send Invite</button>
              </Form>
                <GoogleContacts
                  clientId="684073144866-r8897jh50s55nd531hbjsl5n0n53tu6t.apps.googleusercontent.com"
                  buttonText="Invite From Google Contacts"
                  onSuccess={this.responseCallback}
                  onFailure={this.responseCallback}
                />
               {this.state.contactsModal ? <InviteGoogleContacts contacts={this.state.googleContacts}/> : '' }
            </MainForm>
          );
        }}
      </Mutation>
      </motion.div>
    );
  }
}

export default InviteFriend;
