import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Closed1Button from "../styles/Closed1Button";
import Error from "../ErrorMessage";

const REMOVE_USER_REQUEST = gql`
  mutation REMOVE_USER_REQUEST($id: ID!, $reportId: ID!) {
    deleteUser(id: $id, reportId: $reportId) {
      id
      name
    }
  }
`;

const Content = styled.div`
a {
  padding-left: 5px;
  color: blue;
  font-size: 12px;
  :hover {
    cursor: pointer;
    font-size: 13px;
    text-decoration: underline;
  }
}
`;

class RemoveUser extends Component {
  state = {
    id: "",
    reportID: ''
  };
  componentDidMount() {
    const { userId, reportId } = this.props;
    if (userId) {
      this.setState({ id: userId , reportId: reportId});
    }
  }
  componentDidUpdatet(prevProps) {
    const { userId, reportId } = this.props;
    if (this.props !== prevProps) {
      this.setState({ id: userId, reportId:reportId });
    }
  }
  render() {
    return (
      <Mutation mutation={REMOVE_USER_REQUEST} variables={this.state}>
        {(deleteUser, { error, loading }) => (
          <Content>
            <Error error={error} />
                <span><Closed1Button
                  onClick={async (e) => {
                    e.preventDefault();
                    const response = confirm(`Are you Sure want to delete reported User?`);
                    if(response){
                    await deleteUser();
                    window.location.reload();
                    }
                  }}
                > Remove User </Closed1Button></span>
          </Content>
        )}
      </Mutation>
    );
  }
}

export default RemoveUser;
