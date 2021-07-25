import PleaseSignIn from "../components/PleaseSignIn";
import CreateContact from "../components/CreateContact";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../Queries/Me";
import ContactsLimitReached from "../components/ContactsLimitReached";

const MyContact = props => (
  <div>
    <PleaseSignIn>
    <Query query={CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
    {({ data }) => {
      return data.me.status ==="FREE" && data.me.contacts.length === 5  ? <ContactsLimitReached /> :<CreateContact info={props.query} />
      }}</Query>
    </PleaseSignIn>
  </div>
);

export default MyContact;