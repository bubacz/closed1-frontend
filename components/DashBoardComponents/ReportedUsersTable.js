import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import moment from "moment";
import RemoveUser from "../Connections/RemoveUser";

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
    color: ${(props) => props.theme.green};
  }
`;

class ReportedUsersTable extends Component {
  render() {
    const { users } = this.props;
    console.log(users);
    return (
      <Table>
        <thead className="table-head">
          <tr>
            <th>Full Name</th>
            <th> Email</th>
            <th>Reported By</th>
            <th>Reason</th>
            <th>Reported Time</th>
            <th>Actions</th>
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
                      query: { id: user.user[0].id },
                    }}
                  >
                    {user.user[0].name}
                  </Link>
                </td>
                <td>{user.user[0].name}</td>
                <td>
                  <Link
                    href={{
                      pathname: "/userProfile",
                      query: { id: user.reportedBy[0].id },
                    }}
                    >{user.reportedBy[0].name}</Link></td>
                <td>{user.reason}</td>
                <td>{moment(user.createdAt).format("LLLL")}</td>
                <td>
                  <RemoveUser userId={user.user[0].id} reportId={user.id}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default ReportedUsersTable;
