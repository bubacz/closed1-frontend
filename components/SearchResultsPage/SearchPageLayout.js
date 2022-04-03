import React, { Component } from "react";
import styled from "styled-components";
import SwitchResults from "./SwitchResults";
import SingleFriend from "../SingleFriend";
import Contact from "../Contact";
import Post from "../Post";
import getAllResults from "./getAllResults";

const ResultSection = styled.div`
    background: white;
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
        id: "0",
    };

    switchTo = (key) => this.setState({ id: key });

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
            case "0":
                return getAllResults({ ...this.props.results, friends, usersList }, this.switchTo);
            case "1":
                return allPosts.map((post) => (
                    <div data-aos="fade-up-left" data-aos-duration="300" key={post.id}>
                        <Post post={post} me={me} />
                    </div>
                ));
            case "2":
                return usersList.map((contact) => (
                    <div data-aos="fade-up-left" data-aos-duration="300" key={contact.id}>
                        <SingleFriend
                            data={contact}
                            me={me}
                            id="FindNew"
                        /></div>
                ));
            case "3":
                return searchContacts.map((contact) => (
                    <div data-aos="fade-up-left" data-aos-duration="300"
                        key={contact.id}>
                        <Contact
                            contact={contact}
                            me={contact.owner}
                        /></div>
                )
                );
            case "4":
                return searchFriends.map((contact) => (
                    <div data-aos="fade-up-left" data-aos-duration="300"

                        key={contact.id}>
                        <SingleFriend
                            data={contact}
                            me={me}
                            id="FriendsList"
                        /></div>
                ));
            default:
                return null;
        }
    };
    render() {
        const { searchTerm } = this.props;
        const content = this.fetchComponent();
        return <div className="grid-template" style={{ gap: "2rem" }}>
            <div data-aos="fade-up-right" data-aos-duration="500" className="scrollable sidebar flex-single-column">
                <SwitchResults current={this.state.id} switchTo={this.switchTo} />
            </div>
            <div className="scrollable content flex-single-column" data-aos-duration="500" data-aos="fade-up-left">
                <ResultSection>
                    <h2>Showing results for term "{searchTerm}"</h2>
                    {content?.length ? content : <h3>No results Found with selected filter</h3>}
                </ResultSection>
            </div>
        </div>
    }
}

export default SearchPageLayout;