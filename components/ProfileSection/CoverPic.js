import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPencilRuler } from "@fortawesome/free-solid-svg-icons";
import HandShake from "../../Assets/HandShake.png";

const Pic = styled.div`
  position: relative;
  height: 100%;

  .cover-pic {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 20rem;
    object-fit: fit;
    object-position: center;
  }

  .edit-icon {
    display: flex;
    position: absolute;
    top: 1rem;
    right: 1rem;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    color: ${(props) => props.theme.green};
    background-color: white;

    :hover {
      cursor: pointer;
      background: ${(props) => props.theme.lightgreen};
    }

    svg {
      width: 100%;
      height: 100%;
      padding: .75rem;
      border: 0;
      color: ${(props) => props.theme.green};
      background-color: transparent;

      :hover {
        color: white;
      }
    }

    .file-wrap {
      display: none;
    }
  }
`;

const UPDATE_COVER_PIC_MUTATION = gql`
  mutation UPDATE_COVER_PIC_MUTATION($coverPic: String) {
    updateCoverPic(coverPic: $coverPic) {
        coverPic
    }
  }
`;
class CoverPic extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.state = {
      coverPic: '',
    };
  }

  componentDidMount() {
    this.fetchimage();
  }

  fetchimage() {
    if (this.props.icon) {
      this.setState({ coverPic: this.props.icon });
    }
  }

  handleUpload = () => {
    this.fileUpload.current.click();
  };

  handleChange = async (event, updateCoverPic) => {
    if (event.target.files[0]) {
      this.setState({ coverPic: URL.createObjectURL(event.target.files[0]) });
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
        this.setState({ coverPic: file.secure_url }, () => updateCoverPic());
      }
    }
  };

  render() {
    const { editIcon } = this.props;
    return (
      <Mutation mutation={UPDATE_COVER_PIC_MUTATION} variables={this.state}>
        {(updateCoverPic, { loading, error }) => (
          <Pic>
            <img className="cover-pic" src={this.state.coverPic || HandShake} />
            {editIcon ? (
              <div className="edit-icon">
                <FontAwesomeIcon
                  border
                  fixedWidth
                  icon={faPencilAlt}
                  size="2x"
                  onClick={this.handleUpload}
                />
                <div class="file-wrap">
                  <input
                    type="file"
                    id="uploadfile"
                    ref={this.fileUpload}
                    onChange={(event) =>
                      this.handleChange(event, updateCoverPic)
                    }
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </Pic>
        )}
      </Mutation>
    );
  }
}

export default CoverPic;
