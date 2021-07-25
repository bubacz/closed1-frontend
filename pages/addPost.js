import PleaseSignIn from "../components/PleaseSignIn";
import CreatePost from "../components/NewsFeed/CreatePost";

const MyPost = props => (
  <div>
    <PleaseSignIn>
      <CreatePost />
    </PleaseSignIn>
  </div>
);

export default MyPost;