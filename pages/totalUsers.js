import AllUsers from "../components/DashBoardComponents/GetUsers";

const totalUsers = (props) => (
    <AllUsers page={parseFloat(props.query.page) || 1} />
);

export default totalUsers;
