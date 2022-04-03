import React from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import SingleFriend from "./SingleFriend";
import { motion } from "framer-motion";

const SEARCH_USERS_QUERY = gql`
  query SEARCH_USERS_QUERY($searchTerm: String!) {
    users(
      where: {
        OR: [{ name_contains: $searchTerm }, { email_contains: $searchTerm }]
      }
    ) {
      id
      name
      profilePic
      title
      company
      email
    }
  }
`;

class FindNew extends React.Component {
  state = {
    name: "",
    items: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => {
    let { friends } = this.props.currentUser;
    friends = friends.map((a) => a.id);
    // turn loading on
    this.setState({ loading: true });
    this.setState({ name: e.target.value });
    // Manually query apollo client
    console.log("Searching...", e.target.value);
    const res = await client.query({
      query: SEARCH_USERS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    const usersList = res.data.users.filter((user) => {
      const isFriend = friends.includes(user.id);
      const isMine = this.props.currentUser.id === user.id;
      if (!isFriend && !isMine) {
        return user;
      }
      return null;
    });
    this.setState({
      items: usersList,
      loading: false,
    });
  }, 1000);

  isRequestSent = (id) => {
    let { sent } = this.props.currentUser;
    sent = sent.map((a) => a.id);
    const result = sent.includes(id);
    return result;
  };

  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { scale: 0.6, opacity: 0 },
            visible: { scale: 1, opacity: 1, transition: { delay: 0.3 } },
          }}
        >
          <Downshift itemToString={(item) => (item === null ? "" : item.title)}>
            {({
              getInputProps,
              getItemProps,
              isOpen,
              inputValue,
              highlightedIndex,
            }) => (
              <div>
                <ApolloConsumer>
                  {(client) => (
                    <input
                      {...getInputProps({
                        type: "search",
                        placeholder: "Search For People",
                        id: "search",
                        className: this.state.loading ? "loading" : "",
                        onChange: (e) => {
                          e.persist();
                          this.onChange(e, client);
                        },
                      })}
                    />
                  )}
                </ApolloConsumer>
                <DropDown>
                  {this.state.items.map((item, index) => (
                    <SingleFriend
                      key={index}
                      data={item}
                      id="FindNew"
                      me={this.props.currentUser}
                      isRequested={this.isRequestSent(item.id)}
                    />
                  ))}
                  {isOpen &&
                    !this.state.items.length &&
                    !this.state.loading && (
                      <DropDownItem>
                        {" "}
                        Sorry! Nothing found for "{inputValue}."
                      </DropDownItem>
                    )}
                </DropDown>
              </div>
            )}
          </Downshift>{" "}
        </motion.div>
      </SearchStyles>
    );
  }
}

export default FindNew;
