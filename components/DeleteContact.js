import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_CONTACTS_QUERY } from "./Contacts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash as faTrash } from "@fortawesome/free-solid-svg-icons";

const DELETE_CONTACT_MUTATION = gql`
  mutation DELETE_CONTACT_MUTATION($id: ID!) {
    deleteContact(id: $id) {
      id
    }
  }
`;

class DeleteContact extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_CONTACTS_QUERY  });
    console.log(data, payload);
    // 2. Filter the deleted itemout of the page
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_CONTACTS_QUERY , data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_CONTACT_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <a class="btn btn-light btn-contact"  onClick={async() => {
            if (confirm('Are you sure you want to delete Contact?')) {
              await deleteItem();
              window.location.reload();
            }
          }}><FontAwesomeIcon icon={faTrash} className="fa" /><span class="d-none d-sm-inline-block">Delete</span></a>
        )}
      </Mutation>
    );
  }
}

export default DeleteContact;
