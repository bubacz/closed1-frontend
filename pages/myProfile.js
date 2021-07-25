import AccountDetails from "../components/ProfileSection/MyProfile";
import PleaseSignIn from "../components/PleaseSignIn";

const MyUser = (props) => (
  <PleaseSignIn>
    <AccountDetails />
  </PleaseSignIn>
);

export default MyUser;
