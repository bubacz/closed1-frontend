import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import User from "../../Assets/user.png";

const Pic = styled.div`
  .user-photo-container {
    position: relative;
    width: 12rem;
    height: 6rem;
    margin: 0 2rem;

    .user-photo {
      position: absolute;
      top: -6rem;
      width: 100%;
      height: 12rem;
      border: 2px solid #69ddd1;
      border-radius: 50%;
      background: #ededed;
    }

    .edit-icon {
      display: flex;
      position: absolute;
      right: 0;
      bottom: 1rem;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      color: white;
      background-color: ${(props) => props.theme.green};

      :hover {
        cursor: pointer;
        background: ${(props) => props.theme.lightgreen};
      }

      svg {
        width: 100%;
        height: 100%;
        padding: 0.75rem;
        border: 0;
        color: white;
        background-color: transparent;

        :hover {
          color: white;
        }
      }
    }
  }

  .file-wrap {
    display: none;
  }
`;

const UPDATE_PROFILE_PIC_MUTATION = gql`
  mutation UPDATE_PROFILE_PIC_MUTATION($profilePic: String!) {
    updateProfilePic(profilePic: $profilePic) {
      profilePic
    }
  }
`;
class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.state = {
      profilePic: User,
    };
  }

  componentDidMount() {
    this.fetchimage();
  }

  fetchimage() {
    if (this.props.icon) {
      this.setState({ profilePic: this.props.icon });
    }
  }

  handleUpload = () => {
    this.fileUpload.current.click();
  };

  handleChange = async (event, updateProfilePic) => {
    if (event.target.files[0]) {
      this.setState({ profilePic: URL.createObjectURL(event.target.files[0]) });
      const files = event.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "ProfilePics");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/closedone/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      if(file.secure_url) {
      this.setState({ profilePic: file.secure_url}, () => ( updateProfilePic()) );
      }
    }
  };

  render() {
    const { editIcon } = this.props;
    return (
      <Pic>
        <Mutation mutation={UPDATE_PROFILE_PIC_MUTATION} variables={this.state}>
          {(updateProfilePic, { loading, error }) => (
            <div className="user-photo-container">
              <img className="user-photo" src={this.state.profilePic} />
              {editIcon ? (
                <div className="edit-icon">
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    onClick={this.handleUpload}
                  />
                  <div class="file-wrap">
                    <input
                      type="file"
                      id="uploadfile"
                      ref={this.fileUpload}
                      onChange={(event) => this.handleChange(event, updateProfilePic)}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </Mutation>
      </Pic>
    );
  }
}

export default ProfilePic;
