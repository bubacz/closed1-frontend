import React, { Component } from "react";
import EditProfile from "../components/EditProfile";
import PleaseSignIn from "../components/PleaseSignIn";

class AccountDetails extends Component {
  state = {
    editMode: false,
  };

  handleEditProfile = () => {
    const { editMode } = this.state;
    this.setState({ editMode: !editMode });
  };
  render() {
    const { editMode } = this.state;
    return (
      <PleaseSignIn>
          <EditProfile handleConfirm={this.handleEditProfile} />
      </PleaseSignIn>
    );
  }
}

export default AccountDetails;
