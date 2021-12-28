import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";

const SEARCH_POSTS_QUERY = gql`
  query SEARCH_POSTS_QUERY($searchTerm: String!) {
    allPosts(
      where: {
        OR: [{ company_contains: $searchTerm }, { content_contains: $searchTerm }]
      }
    ) {
      id
      company
      content
      author {
        id
        name
      }
    }
  }
`;

function routeToPost(post) {
  Router.push({
    pathname: '/post',
    query: {
      id: post.id,
    },
  });
}

function routeToSearchResults(searchTerm) {
  Router.push({
    pathname: '/searchResults',
    query: {
      searchTerm: searchTerm,
    },
  });
}

class AutoComplete extends React.Component {
  state = {
    items: [],
    searchTerm: '',
    loading: false,
  };

  onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on
    this.setState({
      loading: true,
    });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_POSTS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    this.setState({
      items: res.data.allPosts,
      loading: false,
    });
  }, 500);

  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift onChange={routeToPost} itemToString={item => (item === null ? '' : item.title)}>
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <form id="search" onSubmit={(e) => {
                    e.preventDefault();
                    routeToSearchResults(this.state.searchTerm);
                  }}>
                    <input
                      {...getInputProps({
                        type: 'search',
                        placeholder: 'Search',
                        id: 'search',
                        className: this.state.loading ? 'loading' : '',
                        onChange: e => {
                          e.persist();
                          this.onChange(e, client);
                          this.setState({searchTerm: e.target.value})
                        },
                      })}
                    /></form>
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.items.map((item, index) =>
                  (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={index}
                      highlighted={index === highlightedIndex}
                    >
                      "{item.content}" by {item.author.name}
                    </DropDownItem>
                  ))}
                  <DropDownItem
                      key={999}
                      index={999}
                      highlighted={highlightedIndex === 999}
                    >
                     <FontAwesomeIcon icon={faSearch}/> Search for "{this.state.searchTerm}"
                    </DropDownItem>
                  {/* {!this.state.items.length &&
                    !this.state.loading && <DropDownItem> Sorry! Nothing found for "{inputValue}."</DropDownItem>} */}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
