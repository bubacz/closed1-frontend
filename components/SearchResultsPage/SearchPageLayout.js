import React, { Component } from "react";
import styled from "styled-components";
import SwitchResults from "./SwitchResults";
import SingleFriend from "../SingleFriend";
import Contact from "../Contact";
import Post from "../Post";

const HomeScreen = styled.div`
`;

const ResultSection = styled.div`
    background: white;
    margin: 1rem;
    height: 100%;
    width: auto;
    h2, h3{
        text-align: center;
    }
    .action-items{
        right: 10%;
    }
`;

class SearchPageLayout extends Component {
    state = {
        id: "1",
    };

    fetchComponent = () => {
        const { id } = this.state;
        const { me, users, allPosts, searchContacts, searchFriends } = this.props.results;
        const friends = me.friends.map(a => a.id);
        const usersList = users.filter((user) => {
            const isFriend = friends.includes(user.id);
            const isMine = me.id === user.id;
            if (!isFriend && !isMine) {
                return user;
            }
            return null;
        });
        switch (id) {
            case "1":
                return usersList.map((contact) => (
                    <SingleFriend
                        key={contact.id}
                        data={contact}
                        me={me}
                        id="FindNew"
                    />
                ));
            case "2":
                return allPosts.map((post) => (
                    <div data-aos="fade-up-left" data-aos-duration="300" key={post.id}>
                        <Post post={post} me={me} />
                    </div>
                ))
            case "3":
                return searchContacts.map((contact) => {
                    return (
                        <Contact
                            key={contact.id}
                            contact={contact}
                            me={contact.owner}
                        />
                    );
                })
            case "4":
                return searchFriends.map((contact) => (
                    <SingleFriend
                        key={contact.id}
                        data={contact}
                        me={me}
                        id="FriendsList"
                    />
                ));
            default:
                return null;
        }
    };
    render() {
        const { results, searchTerm } = this.props;
        const content =this.fetchComponent()
        return <HomeScreen className="grid-template">
            <div data-aos="fade-up-right" data-aos-duration="500" className="scrollable sidebar flex-single-column">
                <SwitchResults current={this.state.id} switchTo={(key) => this.setState({ id: key })} />
            </div>
            <div className="scrollable content flex-single-column" data-aos-duration="500" data-aos="fade-up-left">
                <ResultSection>
                    <h2>Showing results for term "{searchTerm}"</h2>
                    {content.length? content: <h3>No results Found with selected filter</h3>}
                </ResultSection>
            </div>
        </HomeScreen>
    }
}

export default SearchPageLayout;