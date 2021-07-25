import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import User from "../Assets/user-solid.svg";

const Pic = styled.div`
  position: relative;
  left: 40%;
  .user-photo {
    background: ${(props) => props.theme.offWhite};
    border: 2px solid ${(props) => props.theme.lightgreen};
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }

  .file-wrap {
    display: none;
  }
  .edit-icon {
    color: ${(props) => props.theme.green};
    margin: -4.5rem 7rem;
    position: absolute;
    svg {
      :hover {
        color: #e3b504;
        border-radius: 20%;
        background: ${(props) => props.theme.green};
        cursor: pointer;
      }
    }
  }
`;

class ContactPic extends Component {
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

  handleChange = async (event) => {
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
      if (file.secure_url) {
        // this.setState({ profilePic: file.secure_url }, () =>
        //   this.props.setImage(file.secure_url)
        // );

        this.props.setImage(file.secure_url)
      }
    }
  };

  render() {
    return (
      <Pic>
        <img className="user-photo" src={this.state.profilePic} />
        <div className="edit-icon">
          <FontAwesomeIcon
            icon={faPencilAlt}
            size="2x"
            onClick={this.handleUpload}
          />
          <div class="file-wrap">
            <input
              type="file"
              id="uploadfile"
              ref={this.fileUpload}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </Pic>
    );
  }
}

export default ContactPic;
