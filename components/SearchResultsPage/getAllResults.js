import React from 'react';
import styled from "styled-components";
import SingleFriend from "../SingleFriend";
import Contact from "../Contact";
import Post from "../Post";


const ClickMoreLink = styled.div`
color: ${props => props.theme.green};
cursor: pointer;
font-size: 20px;
&:hover{
text-decoration: underline;
}
padding: 1rem;
float: right;
`;

export default function getAllResults(props, switchTo) {
    const { me, allPosts, searchContacts, searchFriends, usersList } = props;
    const resultArray = [];
    if (allPosts && allPosts.length) {
        resultArray.push(
            <div key="posts">
                <h3>Posts</h3>
                {allPosts.slice(0, 3).map((post) => <Post post={post} me={me} key={post.id} />)}
                {allPosts.length > 3 && <ClickMoreLink onClick={() => switchTo('1')}>Click for more posts</ClickMoreLink>}
                <br />
            </div>)
    }
    if (usersList && usersList.length) {
        resultArray.push(
            <div key="people">
                <h3>People</h3>
                {usersList.slice(0, 3).map((contact) => <SingleFriend
                    key={contact.id}
                    data={contact}
                    me={me}
                    id="FindNew"
                />)}
                {usersList.length > 3 && <ClickMoreLink onClick={() => switchTo('2')}>Click for more People</ClickMoreLink>}
                <br />
            </div>)
    }
    if (searchContacts && searchContacts.length) {
        resultArray.push(
            <div key="contacts">
                <h3>Contacts</h3>
                {searchContacts.slice(0, 3).map((contact) => <Contact
                    key={contact.id}
                    contact={contact}
                    me={contact.owner}
                />)}
                {searchContacts.length > 3 && <ClickMoreLink onClick={() => switchTo('3')}>Click for more Contacts</ClickMoreLink>}
                <br />
            </div>)
    }
    if (searchFriends && searchFriends.length) {
        resultArray.push(
            <div key="friends">
                <h3>Friends</h3>
                {searchFriends.slice(0, 3).map((contact) => <SingleFriend
                    key={contact.id}
                    data={contact}
                    me={me}
                    id="FriendsList"
                />)}
                {searchFriends.length > 3 && <ClickMoreLink onClick={() => switchTo('4')}>Click for more Friends</ClickMoreLink>}
                <br />
            </div>)
    }
    return resultArray;

}
