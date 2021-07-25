import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import styled from "styled-components";
import Closed1Button from "./styles/Closed1Button";
import ContactPic from "./ContactPic";

const CREATE_CONTACT_MUTATION = gql`
  mutation CREATE_CONTACT_MUTATION(
    $description: String!
    $email: String!
    $name: String!
    $title: String!
    $contactPic: String!
    $phone: String!
    $company: String!
  ) {
    createContact(
      description: $description
      email: $email
      name: $name
      title: $title
      contactPic: $contactPic
      phone: $phone
      company: $company
    ) {
      id
    }
  }
`;

export const AddContactStyle = styled.div`
  width: 100%;
  max-width: 768px;
  margin: auto;

  .contact-action-button-row {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  #description {
    height: 100px;
  }
`;
class CreateContact extends Component {
  state = {
    description: "",
    email: "",
    name: "",
    phone: "",
    contactPic: "",
    title: "",
    company: "",
  };

  componentDidMount() {
    const { info } = this.props;
    if (info) {
      this.fetchFromPost(info);
    }
  }

  componentDidUpdatet(prevProps) {
    const { info } = this.props;
    if (this.props !== prevProps && info) {
      this.fetchFromPost(info);
    }
  }

  fetchFromPost = (info) => {
    if(info.company && info.description){
    this.setState({company: info.company, description: info.description});
    }
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  setContactPhoto = (image) => {
    this.setState({contactPic: image});
  }

  render() {
    const { source } = this.props.info;
    return (
      <AddContactStyle>
        <Mutation mutation={CREATE_CONTACT_MUTATION} variables={this.state}>
          {(createContact, { loading, error }) => (
            <div>
            <ContactPic setImage={this.setContactPhoto} icon={this.state.contactPic}/>
            <Form
              data-test="form"
              onSubmit={async (e) => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await createContact();
                // change them to the single item page
                if(source === 'posts'){
                  Router.push({
                    pathname: "/posts",
                  });
                }else  Router.push({
                  pathname: "/rolodex",
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
                    placeholder="Contact Name"
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
                    placeholder="Contact Email"
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
                    placeholder="Contact Phone Number"
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
                    placeholder="Contact Description"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </label>

                <div class="contact-action-button-row">
                  <Closed1Button className="btn btn-primary m-0" type="submit">Create Contact</Closed1Button>
                  <Closed1Button className="btn btn-light m-0" type="button" onClick={()=>{window.history.back()}}>Cancel</Closed1Button>
                </div>
              </fieldset>
            </Form></div>
          )}
        </Mutation>
      </AddContactStyle>
    );
  }
}

CreateContact.defaultProps = {
  postId: "",
};

CreateContact.propTypes = {
  postId: PropTypes.string,
};

export default CreateContact;
export { CREATE_CONTACT_MUTATION };
