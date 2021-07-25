import UpdateContact from "../components/UpdateContact";
import PleaseSignIn from "../components/PleaseSignIn";

const EditContact = ({ query }) => (
  <PleaseSignIn>
    <UpdateContact id={query.id} />
  </PleaseSignIn>
); 

export default EditContact;
