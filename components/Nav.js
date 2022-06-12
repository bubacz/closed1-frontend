import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import ProfileNav from "./ProfileNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faAddressBook, faRss, faUserFriends } from "@fortawesome/free-solid-svg-icons";

const Nav = (props) => (
  <NavStyles data-test="nav">
    {props.user && (
      <>
        {props.user.active && <>
          <Link href="/posts">
            <a> <FontAwesomeIcon icon={faRss} />
              Feed</a>
          </Link>
          <Link href="/rolodex">
            <a>  <FontAwesomeIcon icon={faAddressBook} />Rolodex</a>
          </Link>
          <Link href="/messengerPage">
            <a>  <FontAwesomeIcon icon={faCommentDots} />Messages</a>
          </Link>
          <Link href="/yourFriends">
            <a> <FontAwesomeIcon icon={faUserFriends} />Friends {props.user.received.length > 0 ? <span className="notification-badge">{props.user.received.length}</span> : ''}
            </a>
          </Link>
          <ProfileNav user={props.user} />
        </>}
      </>
    )}
  </NavStyles>
);

export default Nav;
