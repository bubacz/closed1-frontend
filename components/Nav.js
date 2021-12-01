import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import SignOut from "./Signout"; 
import ProfileNav from "./ProfileNav";

const Nav = (props) => (
        <NavStyles data-test="nav">
          {props.user && (
          <>
            {props.user.active ? <>
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
                <a>Friends {props.user.received.length > 0 ? <span className="notification-badge">{props.user.received.length}</span> : ''}
                </a>
              </Link>
              <ProfileNav user={props.user}/>
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

export default Nav;
