import UpdatePost from "../components/UpdatePost";
import PleaseSignIn from "../components/PleaseSignIn";

const Post = ({ query }) => (
  <PleaseSignIn>
    <UpdatePost id={query.id} />
  </PleaseSignIn>
);

export default Post;
