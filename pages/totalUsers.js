import AllUsers from "../components/DashBoard Components/AllUsers";
// import PleaseSignIn from "../components/PleaseSignIn";

const totalUsers = (props) => (
    <AllUsers page={parseFloat(props.query.page) || 1} />
);

export default totalUsers;
