import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import Closed1Button from "./styles/Closed1Button";
import ContactPic from "./ContactPic";

const UPDATE_CONTACT_MUTATION = gql`
  mutation UPDATE_CONTACT_MUTATION(
    $id: ID!
    $description: String!
    $email: String!
    $name: String!
    $title: String!
    $contactPic: String!
    $phone: String!
    $company: String!
  ) {
    updateContact(
      id: $id
      description: $description
      email: $email
      name: $name
      title:$title
      contactPic:$contactPic
      phone: $phone
      company: $company
    ) {
      id
      name
      contactPic
      email
      title
      company
      phone
      description
    }
  }
`;

class ContactUpdateForm extends Component {
  state = this.props.data;

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  setContactPhoto = (image) => {
    this.setState({contactPic: image});
  }

  render() {
    return (
      <Mutation mutation={UPDATE_CONTACT_MUTATION} variables={this.state}>
        {(updateContact, { loading, error }) => (
          <div><ContactPic setImage={this.setContactPhoto} icon={this.state.contactPic}/>
          <Form
            data-test="form"
            onSubmit={async (e) => {
              // Stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await updateContact();
              // change them to the single item page
              Router.push({
                pathname: "/contact",
                query: { id: res.data.updateContact.id },
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="name">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="nameInputBox form-control"
                  placeholder="Contact name"
                  required
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label> 
              <label htmlFor="title">
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="titleInputBox form-control"
                  placeholder="Contact Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="company">
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="companyInputBox form-control"
                  placeholder="Contact Company"
                  required
                  value={this.state.company}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="email">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="emailInputBox form-control"
                  placeholder="Contact email"
                  required
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="phone">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="phoneNumberInputBox form-control"
                  placeholder="Contact phone number"
                  required
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  className="descriptionInputBox form-control"
                  placeholder="Contact description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <div class="contact-action-button-row">
                  <Closed1Button className="btn btn-primary m-0" type="submit">Sav{loading ? "ing" : "e"} Changes</Closed1Button>
                  <Closed1Button className="btn btn-light m-0" type="button" onClick={()=>{window.history.back()}}>Cancel</Closed1Button>
                </div>
            </fieldset>
          </Form></div>
        )}
      </Mutation>
    );
  }
}

export default ContactUpdateForm;
