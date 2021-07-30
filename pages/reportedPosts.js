import AllReportedPosts from "../components/DashBoardComponents/AllReportedPosts";
// import PleaseSignIn from "../components/PleaseSignIn";

const reportedPosts = (props) => (
    <AllReportedPosts page={parseFloat(props.query.page) || 1} />
);

export default reportedPosts;
