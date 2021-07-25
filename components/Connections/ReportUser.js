import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Closed1Button from "../styles/Closed1Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const REPORT_USER_REQUEST = gql`
  mutation REPORT_USER_REQUEST($id: ID!) {
    reportUser(id: $id) {
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

class ReportUser extends Component {
  state = {
    id: "",
    name: "",
  };

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setState({ id: user.id, name: user.name });
    }
  }

  componentDidUpdatet(prevProps) {
    const { user } = this.props;
    if (this.props !== prevProps) {
      this.setState({ id: user.id, name: user.name });
    }
  }

  handleReport = async (confirmReport) => {
    const { name } = this.state;
    const response = confirm(`Are you Sure want to report ${name}?`);
    if (response) {
      const res = await confirmReport();
      console.log(res);
    }
  };

  render() {
    return (
      <Mutation mutation={REPORT_USER_REQUEST} variables={{id: this.state.id}}>
        {(removeFriend, { error, loading }) => {
          if (loading) return <h3>loading...</h3>;
          return (
            <Content>
              <FontAwesomeIcon
                icon={faEllipsisV}
                data-tip="report user"
                data-event="click"
                className="options"
              />
              <ReactTooltip
                event="click"
                globalEventOff="click"
                className="customeTheme"
                place="bottom"
                effect="solid"
                clickable={true}
                getContent={() => (
                  <Closed1Button
                    className="report-user"
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleReport(removeFriend);
                    }}
                  >
                    Report User
                  </Closed1Button>
                )}
              />
            </Content>
          );
        }}
      </Mutation>
    );
  }
}

export default ReportUser;
