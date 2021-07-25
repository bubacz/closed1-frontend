import ConnectionRequest from "../components/Connections/ConnectionRequests";
import PleaseSignIn from "../components/PleaseSignIn";

const ConnectionsRequest = () => (
  <div>
    <PleaseSignIn>
      <ConnectionRequest />
    </PleaseSignIn>
  </div>
);

export default ConnectionsRequest;
