import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import moment from 'moment';

const Table = styled.table`
text-align: center;
  border-spacing: 0;
  width: 100%;
  border: 1px solid ${(props) => props.theme.green};
  border-bottom: 0;
  thead {
    font-size: 16px;
  }
  td,
  th {
    border-bottom: 1px solid ${(props) => props.theme.green};
    border-right: 1px solid ${(props) => props.theme.green};
    padding: 5px;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      padding: 10px 5px;
      display: block;
    }
  }
  a {
      color:${(props) => props.theme.green};
  }
`;

class UserTable extends Component {
  render() {
    const { users } = this.props;
    return (
      <Table>
        <thead className="table-head">
          <tr>
            <th>Full Name</th>
            <th> Email</th>
            <th>Paid Status</th>
            <th>Posts</th>
            <th>Recent Active</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                  <td>
                <Link
                  href={{
                    pathname: "/userProfile",
                    query: { id: user.id },
                  }}
                >{user.name}
                </Link></td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user.posts.length}</td>
                <td>{moment(user.lastActive).format("LLLL")}</td>
                <td>{user.permissions}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default UserTable;
