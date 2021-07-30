import React, { Component } from "react";
import { Query } from "react-apollo";
import Link from "next/link";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import AnimatedNumber from "animated-number-react";
import PleaseSignIn from "../components/PleaseSignIn";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { getReports, getUtcDates } from "../lib/StatisticUtils";
import { GET_POSTS_DATA } from "../Queries/DashBoardQueries";

const Graphs = styled.div`
  display: grid;
  background: white;
  grid-template-columns: auto auto;
  gap: 2em;
  text-align: center;
  color: #26a69a;;
  .counts {
    display: contents;
    .item {
      height: 150px;
      text-align: center;
      font-size: 32px;
      border: 1px solid;
      border-radius: 5px;
      display: grid;
      margin: 5rem 10rem;
      background: white;
    }
    .item:not(:first-child):hover {
      cursor: pointer;
      color: white;
      background: #26a69a;
      border: 2px solid white;
    }
  }
`;

class Admin extends Component {
  formatValue = (value) => value.toFixed(2);

  render() {
    const stats = getUtcDates();
    return (
      <PleaseSignIn page="admin">
      <Query
        query={GET_POSTS_DATA}
        fetchPolicy="cache-and-network"
        variables={stats}
      >
        {({ loading, data }) => {
          if (loading) return <LoadingSpinner />;
          const result1 = [
            { name: "42d", count: data.postWeek6.aggregate.count },
            { name: "35d", count: data.postWeek5.aggregate.count },
            { name: "28d", count: data.postWeek4.aggregate.count },
            { name: "21d", count: data.postWeek3.aggregate.count },
            { name: "14d", count: data.postWeek2.aggregate.count },
            { name: "7d", count: data.postWeek1.aggregate.count },
          ];
          const result2 = [
            { name: "6m", count: data.postMonth6.aggregate.count },
            { name: "5m", count: data.postMonth5.aggregate.count },
            { name: "4m", count: data.postMonth4.aggregate.count },
            { name: "3m", count: data.postMonth3.aggregate.count },
            { name: "2m", count: data.postMonth2.aggregate.count },
            { name: "1m", count: data.postMonth1.aggregate.count },
          ];
          const result3 = [
            { name: "42d", count: data.userWeek6.aggregate.count },
            { name: "35d", count: data.userWeek5.aggregate.count },
            { name: "28d", count: data.userWeek4.aggregate.count },
            { name: "21d", count: data.userWeek3.aggregate.count },
            { name: "14d", count: data.userWeek2.aggregate.count },
            { name: "7d", count: data.userWeek1.aggregate.count },
          ];
          const result4 = [
            { name: "6m", count: data.userMonth6.aggregate.count },
            { name: "5m", count: data.userMonth5.aggregate.count },
            { name: "4m", count: data.userMonth4.aggregate.count },
            { name: "3m", count: data.userMonth3.aggregate.count },
            { name: "2m", count: data.userMonth2.aggregate.count },
            { name: "1m", count: data.userMonth1.aggregate.count },
          ];
          const data01 = [
            { name: "FREE", value: data.freeUsers.aggregate.count },
            { name: "PAID", value: data.paidUsers.aggregate.count },
            { name: "EMPLOYEEs", value: data.employeeUsers.aggregate.count },
          ];
          return (
            <Graphs>
              <div className="counts">
                <div className="item posts">
                  Total Posts
                  <AnimatedNumber
                    value={data.totalPosts.aggregate.count}
                    formatValue={this.formatValue}
                  />
                </div>
                <Link href={{
                    pathname: "/reportedPosts",
                    query: { page: 1 },
                  }}>
                <div className="item posts">
                  Total Reported Posts
                  <AnimatedNumber
                    value={data.totalReportedPosts.aggregate.count}
                    formatValue={this.formatValue}
                  />
                </div></Link>
                <Link href={{
                    pathname: "/totalUsers",
                    query: { page: 1 },
                  }}><div className="item users">
                  Total Users
                  <AnimatedNumber
                    value={data.totalUsers.aggregate.count}
                    formatValue={this.formatValue}
                  />
                </div></Link>
                
                <Link href={{
                    pathname: "/reportedUsers",
                    query: { page: 1 },
                  }}><div className="item users">
                  Total Reported Users
                  <AnimatedNumber
                    value={data.totalReportedUsers.aggregate.count}
                    formatValue={this.formatValue}
                  />
                </div></Link>
              </div>
              <div>
                {/* <ResponsiveContainer width="100%" height="100%"> */}
                <PieChart width={500} height={300}>
                  <Pie
                    dataKey="value"
                    isAnimationActive
                    data={data01}
                    // cx="80%"
                    // cy="80%"
                    // outerRadius={80}
                    fill="#26A69A"
                    label
                  />
                  <Tooltip />
                </PieChart>
                {/* </ResponsiveContainer> */}
                <h1>FREE VS PAID USERS</h1>
              </div>
              <div>
                <LineChart width={500} height={300} data={result1}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend name="count" />
                  {/* <CartesianGrid stroke="#26A69A" strokeDasharray="5 5" /> */}
                  <Line type="monotone" dataKey="count" stroke="#26A69A" />
                </LineChart>
                <h1>Posts Weekly Report</h1>
              </div>
              <div>
                <LineChart width={500} height={300} data={result2}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {/* <CartesianGrid stroke="#26A69A" strokeDasharray="8 8" /> */}
                  <Line type="monotone" dataKey="count" stroke="#26A69A" />
                </LineChart>
                <h1>Posts Monthly Report</h1>
              </div>
              <div>
                <LineChart width={500} height={300} data={result3}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend name="count" />
                  {/* <CartesianGrid stroke="#26A69A" strokeDasharray="5 5" /> */}
                  <Line type="monotone" dataKey="count" stroke="#26A69A" />
                </LineChart>
                <h1>Users Weekly Report</h1>
              </div>
              <div>
                <LineChart width={500} height={300} data={result4}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend name="count" />
                  {/* <CartesianGrid stroke="#26A69A" strokeDasharray="5 5" /> */}
                  <Line type="monotone" dataKey="count" stroke="#26A69A" />
                </LineChart>
                <h1>Users Monthly Report</h1>
              </div>
            </Graphs>
          );
        }}
      </Query>
   </PleaseSignIn>);
  }
}

export default Admin;
