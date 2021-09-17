import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import moment from "moment";
import RemovePost from "../Connections/RemovePost";

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

class ReportedPostsTable extends Component {
  render() {
    const { users } = this.props;
    return (
      <Table>
        <thead className="table-head">
          <tr>
            <th>Content</th>
            <th>Company</th>
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
                    {user.post.content}
                </td>
                <td>{user.post.company}</td>
                <td>
                  <Link
                    href={{
                      pathname: "/userProfile",
                      query: { id: user.reportedBy.id },
                    }}
                    >{user.reportedBy.name}</Link></td>
                <td>{user.reason}</td>
                <td>{moment(user.createdAt).format("LLLL")}</td>
                <td>
                  <RemovePost id={user.post.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default ReportedPostsTable;
