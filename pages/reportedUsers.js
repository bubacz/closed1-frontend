import AllReportedUsers from "../components/DashBoardComponents/AllReportedUsers";

const reportedUsers = (props) => (
    <AllReportedUsers page={parseFloat(props.query.page) || 1} />
);

export default reportedUsers;
