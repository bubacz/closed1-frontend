import AllReportedPosts from "../components/DashBoardComponents/AllReportedPosts";

const reportedPosts = (props) => (
    <AllReportedPosts page={parseFloat(props.query.page) || 1} />
);

export default reportedPosts;
