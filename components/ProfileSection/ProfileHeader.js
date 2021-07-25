import React, { Component } from "react";
import styled from "styled-components";
import ProfileContent from "./ProfileContent";
import ProfilePic from "./ProfilePic";
import CoverPic from "./CoverPic";
import ReportUser from '../Connections/ReportUser';

const Profile = styled.div`
  display: grid;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  background: white;
  grid-template-rows: auto;
  grid-row-gap: 2px;

  input[type="file" i] {
    visibility: hidden;
  }

  .cover {
    position: relative;
    height: 20rem;
    border-radius: 1rem 1rem 0 0;
    background-color: ${(props) => props.theme.green};

    .cover-pic {
      border-radius: 1rem 1rem 0 0;
    }
  }

  .profile {
    padding: 1rem 2rem 2rem;
  }

  button {
    justify-content: center;
  }
`;
class ProfileHeader extends Component {
  render() {
    const { user, me } = this.props;
    return (
      <Profile className="card">
        <div className="card-body p-0">
          <div className="cover">
            <CoverPic
              className="cover-pic"
              icon={user.coverPic}
              editIcon={user.id === me.id}
            />
          </div>
          <ProfilePic
            className="profile-pic"
            icon={user.profilePic}
            editIcon={user.id === me.id}
          />
          {user.id !== me.id ? <ReportUser user={user}/> : ''}
          <div className="profile">
            <ProfileContent user={user} me={me} />
          </div>
        </div>
      </Profile>
    );
  }
}
export default ProfileHeader;
