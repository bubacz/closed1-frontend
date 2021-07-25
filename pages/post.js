import SinglePost from "../components/SinglePost";
import PleaseSignIn from "../components/PleaseSignIn";

const Post = (props) => (
  <PleaseSignIn>
    <SinglePost id={props.query.id} />
  </PleaseSignIn>
);

export default Post;
