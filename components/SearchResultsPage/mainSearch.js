import React, { Component } from "react";
import { Query } from "react-apollo";
import LoadingSpinner from "../LoadingSpinner";
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
