import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import { isOwner } from '../lib/genUtils';
import ContactStyles from './styles/ContactStyles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle as faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt as faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import DeleteContact from './DeleteContact';

class Contact extends Component {

  render() {
    const { contact, me } = this.props;
    return(
      <>
      { 
        isOwner(me.id, contact.owner.id) &&
        <ContactStyles>
          <Link
            href={{
              pathname: '/contact',
              query: { id: contact.id },
            }}
          >
            <a>
            {contact.contactPic ? <img className="user-photo" src={contact.contactPic}/> :
              <FontAwesomeIcon icon={faUserCircle} className="contact-photo fa-3x" />}
            </a>
          </Link>

          <Link
            href={{
              pathname: '/contact',
              query: { id: contact.id },
            }}
          >
            <a className="contact-info-text">
              <span className="contact-name">{`${contact.name}`}</span>
              <span className="contact-description">{`${contact.title}`} @ {`${contact.company}`}</span>
            </a>
          </Link>
          
          
          <DeleteContact id={contact.id}/>
          <Link
            href={{
              pathname: '/updateContact',
              query: { id: contact.id },
            }}
          >
            <a class="btn btn-primary btn-contact">
              <FontAwesomeIcon icon={faPencilAlt} className="fa" />
              <span class="d-none d-sm-inline-block">Update</span>
              </a>
          </Link>
        </ContactStyles>
      }
      { 
        !isOwner(me.id, contact.owner.id) &&
        <div>
          <p>You need to be the owner of this contact to view it.</p>
        </div>
      }
      </>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired
}

export default Contact;