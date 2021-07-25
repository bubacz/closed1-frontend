import React, { Component } from "react";
import { Query } from "react-apollo";
import Posts from "../Posts";
import ProfileHeader from "./ProfileHeader";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "../../Queries/Me";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";

const MyProfile = styled.div`
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
  .protected {
    margin-left: 20%;
    font-size: 2rem;
  }
  .icon {
    position: absolute;
    width: 50%;
    height: 40%;
    margin-left: 2.5rem;
    color: ${(props) => props.theme.lightgreen};
  }
`;

class ProfileTemplate extends Component {
  isMyFriend = (me) => {
    const { user } = this.props;
    if (me.id === user.id) {
      return true;
    } else {
      let list = me.friends.map((a) => a.id);
      return list.includes(user.id);
    }
  };
  render() {
    const { user } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (!data) return <p>No User Found!</p>;
          const { me } = data;
          return (
            <MyProfile>
              <ProfileHeader user={user} me={me} />
              {this.isMyFriend(me) ? (
                <Posts posts={user.posts} user={me} />
              ) : (
                <div>
                  <div className="protected">
                    <div>you are not friends with {user.name}</div>
                    <div> &emsp;&nbsp; Connect to see Deals/Posts</div>
                  </div>
                  <FontAwesomeIcon className="icon" icon={faUserLock} />
                </div>
              )}
            </MyProfile>
          );
        }}
      </Query>
    );
  }
}
export default ProfileTemplate;
