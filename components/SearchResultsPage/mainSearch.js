import React, { Component } from "react";
import styled from "styled-components";
// import ConnectionRequests from "./Connections/ConnectionRequests";
// import FindNew from "./FindNew";
// import InviteFriend from "./InviteFriend";
// import Friends from "./Friends";
import { Query } from "react-apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../LoadingSpinner";
import {
    faUserFriends,
    faBell,
    faSearchPlus,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import MAIN_SEARCH_ENGINE_QUERY from "./searchQuery";
import SearchPageLayout from "./SearchPageLayout";

class MainSearch extends Component {

    render() {
        const { searchTerm } = this.props;
        return (
            <Query
                query={MAIN_SEARCH_ENGINE_QUERY}
                fetchPolicy="cache-and-network"
                variables={{ searchTerm: searchTerm }}>
                {({ error, loading, data }) => {
                    if (loading) return <LoadingSpinner />
                    if (error) return <h2>Seems like we ran into an issue</h2>
                    return <SearchPageLayout results={data} searchTerm={searchTerm}/>
                }}
            </Query>
        );
    }
}

export default MainSearch;
