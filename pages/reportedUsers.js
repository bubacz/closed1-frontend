import AllReportedUsers from "../components/DashBoardComponents/AllReportedUsers";
// import PleaseSignIn from "../components/PleaseSignIn";

const reportedUsers = (props) => (
    <AllReportedUsers page={parseFloat(props.query.page) || 1} />
);

export default reportedUsers;
