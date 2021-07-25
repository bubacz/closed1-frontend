import Contacts from "../components/Contacts";
import PleaseSignIn from "../components/PleaseSignIn";

const Contact = (props) => (
  <PleaseSignIn>
    <Contacts page={parseFloat(props.query.page) || 1} />
  </PleaseSignIn>
);

export default Contact;
