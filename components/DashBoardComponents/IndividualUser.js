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

class IndividualUser extends Component {

  render() {
    const { user } = this.props;
    return(
        <ContactStyles>
          <Link
            href={{
              pathname: '/contact',
              query: { id: contact.id },
            }}
          >
            <a>
            {user.contactPic ? <img className="user-photo" src={user.contactPic}/> :
              <FontAwesomeIcon icon={faUserCircle} className="contact-photo fa-3x" />}
            </a>
          </Link>

          <Link
            href={{
              pathname: '/user',
              query: { id: user.id },
            }}
          >
            <a className="contact-info-text">
              <span className="contact-name">{`${user.name}`}</span>
            </a>
          </Link>
        </ContactStyles>
      
    );
  }
}

export default IndividualUser;