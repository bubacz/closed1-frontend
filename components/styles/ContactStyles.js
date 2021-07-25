import styled from 'styled-components';

const Contact = styled.div`
  border-bottom: 1px solid ${props => props.theme.offWhite};
  display: grid;
  grid-template-columns: auto 2fr repeat(2, auto);
  column-gap: 1rem;
  align-items: center;
  padding: 1rem 0;

  .user-photo {
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
  .contact-info-text {
    display: flex;
    flex-direction: column;
    line-height: 2rem;
    overflow-x: hidden;
    white-space: nowrap;
  }

  .contact-photo {
    grid-row: 1 / 3;
    color: #999;
  }

  .contact-name {
    overflow-x: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
  }

  .contact-description {
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .btn-contact .fa {
    margin-right: 0.75rem;
    margin-top: -1px;
  }
    @media (max-width : 575px) {
      .btn-contact {
        border: 0;
        background-color: transparent;
        color: ${props => props.theme.green};
        padding: 0.5rem;
      }
      
      .btn-contact .fa {
        margin-right: 0;
      }
    }
`;

export default Contact;
