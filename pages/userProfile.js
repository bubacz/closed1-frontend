import { withRouter } from "next/router";
import UsersProfile from "../components/ProfileSection/UsersProfile";
import PleaseSignIn from "../components/PleaseSignIn";

const userProfile = withRouter((props) => (
  <PleaseSignIn>
    <UsersProfile userId={props.router.query.id} />
    {/* <div> {props.router.query.id}</div> */}
  </PleaseSignIn>
));

export default userProfile;
