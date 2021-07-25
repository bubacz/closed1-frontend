import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import SignOut from "./Signout"; 
import ProfileNav from "./ProfileNav";

const Nav = () => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null;
      return (
        <NavStyles data-test="nav">
          {me && (
          <>
            {me.active ? <>
              <Link href="/posts">
                <a>Feed</a>
              </Link>
              <Link href="/rolodex">
                <a>Rolodex</a>
              </Link>
              <Link href="/messengerPage">
                <a>Messages</a>
              </Link>
              <Link href="/yourFriends">
                <a>Friends {me.received.length > 0 ? <span className="notification-badge">{me.received.length}</span> : ''}
                </a>
              </Link>
              <ProfileNav user={me}/>
            </> : ''}
             <SignOut />
             </>
          )}
          {/* commented will need to remove at the time of cleanup */}
          {/* {!me && (
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          )} */}
        </NavStyles>
      );
    }}
  </User>
);

export default Nav;
