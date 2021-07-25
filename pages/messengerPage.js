import Messenger from "../MessengerComponents/pages/messenger";
import PleaseSignIn from "../components/PleaseSignIn";

const messengerPage = (props) => (
    <PleaseSignIn>
      <Messenger id={props.query.id} />
    </PleaseSignIn>
  );

export default messengerPage;