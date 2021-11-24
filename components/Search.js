import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

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
        name
      }
    }
  }
`;

function routeToPost(post) {
  console.log('post', post);
  Router.push({
    pathname: '/post',
    query: {
      id: post.id,
    },
  });
}

class AutoComplete extends React.Component {
  state = {
    items: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_POSTS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    console.log('res', res);
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
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search For A Post',
                      id: 'search',
                      className: this.state.loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
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
                  {!this.state.items.length &&
                    !this.state.loading && <DropDownItem> Sorry! Nothing found for "{inputValue}."</DropDownItem>}
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
