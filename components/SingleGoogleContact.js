import React from "react";
import InviteFriendButton from "./Connections/InviteFriendButton";
import styled from "styled-components";


const Contact = styled.div``

class SingleGoogleContact extends React.Component {

  render() {
    const user = this.props.data;
    return (
      <div>
          {user.email}
          <InviteFriendButton email={user.email}/>
      </div>
    );
  }
}

export default SingleGoogleContact;
