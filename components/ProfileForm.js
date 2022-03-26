import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Closed1Button from "./styles/Closed1Button";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import styled from "styled-components";
import Router from "next/router";

const StyledForm = styled.div`
  width: 800px;
  max-width: 100%;
  margin: auto;
  padding: 1rem;
  background: white;

  input {
    padding: 1rem;
  }
  p {
    font-size: 18px;
    text-align: center;
  }
  .error{
    color:red;
  }
  .contact-info,
  .job-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 5rem;
    grid-row-gap: 1rem;

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }

  .submit-button {
    display: block;
    margin-left: auto;

    @media (max-width: 576px) {
      width: 100%;
    }
  }
`;
const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $name: String
    $email: String
    $phone: String
    $city: String
    $country: String
    $state: String
    $title: String
    $company: String
    $territory: String
    $targetBuyers: String
  ) {
    updateUser(
      email: $email
      name: $name
      phone: $phone
      city: $city
      country: $country
      state: $state
      title: $title
      company: $company
      territory: $territory
      targetBuyers: $targetBuyers
    ) {
      email
      name
      phone
      city
      country
      state
      title
      company
      territory
      targetBuyers
    }
  }
`;

class ProfileForm extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    state: "",
    title: "",
    company: "",
    territory: "",
    targetBuyers: "",
    error: "",
  };

  // this part of code to be uncommented when we get whole profile details as mentioned
  // from the endpoint
  componentDidMount() {
    const userDetails = this.props.data;
    this.setState({
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      city: userDetails.city,
      country: userDetails.country,
      state: userDetails.state,
      title: userDetails.title,
      company: userDetails.company,
      territory: userDetails.territory,
      targetBuyers: userDetails.targetBuyers,
    });
  }

  componentDidUpdate(prevprops) {
    const userDetails = this.props.data;
    if (this.props !== prevprops) {
      this.setState({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        city: userDetails.city,
        country: userDetails.country,
        state: userDetails.state,
        title: userDetails.title,
        company: userDetails.company,
        territory: userDetails.territory,
        targetBuyers: userDetails.targetBuyers,
      });
    }
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
      const result = validEmailRegex.test(e.target.value)
        ? ""
        : "Please Enter a valid email";
      this.setState({ error: result });
    }
  };

  render() {
    // const { data } = this.props;
    return (
      <StyledForm>
        <Mutation mutation={UPDATE_USER_MUTATION} variables={this.state}>
          {(updateUser, { loading, error }) => (
            <Form
              method="post"
              onSubmit={async (e) => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await updateUser();
                // change them to the single item page
                // Router.push({
                //   pathname: "/posts",
                // });
                Router.push({
                  pathname: "/myProfile",
                });
              }}
            >
              <Error error={error} /> 
              <p>Contact Information</p>
              <div className="contact-info">
                <label htmlFor="Name">
                  Full Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    disabled
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                  {this.state.error ? <span className="error">{this.state.error}</span> : ''}
                </label>
                <label htmlFor="Phone">
                  Phone Number
                  <input
                    type="numeric"
                    name="phone"
                    placeholder="Phone"
                    value={this.state.phone}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="city">
                  City
                  <input
                    type="text"
                    name="city"
                    placeholder="city"
                    value={this.state.city}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="country">
                  Country
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={this.state.country}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="state">
                  State
                  <input
                    type="text"
                    name="state"
                    placeholder="state"
                    value={this.state.state}
                    onChange={this.saveToState}
                  />
                </label>
              </div>
              <br />
              <p>Job / Position Information</p>
              <div className="job-info">
                <label htmlFor="Title">
                  Title
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="Company">
                  Company
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={this.state.company}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="Territory">
                  Territory
                  <input
                    type="text"
                    name="territory"
                    placeholder="Territory"
                    value={this.state.territory}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="TargetBuyers">
                  Target Buyers
                  <input
                    type="text"
                    name="targetBuyers"
                    placeholder="Target Buyers"
                    value={this.state.targetBuyers}
                    onChange={this.saveToState}
                  />
                </label>
              </div>
              <br />
              <br />
              <Closed1Button className="submit-button" type="submit">
                Confirm{loading ? "ing" : ""} Changes
              </Closed1Button>
            </Form>
          )}
        </Mutation>
      </StyledForm>
    );
  }
}

export default ProfileForm;
