import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Closed1Button from "../styles/Closed1Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const REPORT_POST_REQUEST = gql`
  mutation REPORT_POST_REQUEST($id: ID!) {
    reportPost(id: $id) {
      id
    }
  }
`;

const Content = styled.div`
.options {
  float: right;
  margin: 1rem;
  color: ${(props) => props.theme.green};
}

.customeTheme {
  background: none;
  width: fit-content;
  height: fit-content;
  .report-user {
    font-size: 16px;
    color: white;
    background: ${(props) => props.theme.green};
    padding: 5px;
    cursor: pointer
    :hover {
      color: ${(props) => props.theme.green};
      background: white;
    }
  }
 }`;

class ReportPost extends Component {
  state = {
    id: "",
  };

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.setState({ id: id});
    }
  }

  componentDidUpdatet(prevProps) {
    const { id } = this.props;
    if (this.props !== prevProps) {
      this.setState({ id: id });
    }
  }

  handleReport = async (confirmReport) => {
    const { id } = this.state;
    const response = confirm(`Are you Sure want to report ${id}?`);
    if (response) {
       await confirmReport();
       window.location.reload();s
    }
  };

  render() {
    return (
      <Mutation mutation={REPORT_POST_REQUEST} variables={this.state}>
        {(confirmReport, { error, loading }) => {
          return (
            <Content>
              <a className={loading ? "inactiveLink" : ''}>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                data-tip="report user"
                data-event="click"
                className="options"
                onClick={async(e) => {
                  e.preventDefault();
                  this.handleReport(confirmReport);
                }}
              /></a>
            </Content>
          );
        }}
      </Mutation>
    );
  }
}

export default ReportPost;
