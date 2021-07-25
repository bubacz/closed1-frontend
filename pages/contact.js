import SingleContact from "../components/SingleContact";
import PleaseSignIn from "../components/PleaseSignIn";

const Contact = (props) => (
  <PleaseSignIn>
    <SingleContact id={props.query.id} />
  </PleaseSignIn>
);

export default Contact;
