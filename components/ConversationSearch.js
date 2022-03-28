import React from "react";
import styled from "styled-components";

export const Search = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  
  @media (max-width: 576px) {
    flex-grow: 1;
  }

  > * {
    margin: 0;
  }
`;

class ConversationSearch extends React.Component {
  state = {
    conversation: "",
  };

  handleChange = (e) => {
    let { conversation } = this.state;
    conversation = e.target.value;
    this.props.triggerSearch(conversation.toLowerCase());
    this.setState({ conversation });
  };

  render() {
    return (
      <Search>
        <input
          type="search"
          className="form-control"
          placeholder={
            this.props.usage === "friends"
              ? "Search Friends"
              : "Search Messages"
          }
          onChange={this.handleChange}
          value={this.state.conversation}
        />
      </Search>
    );
  }
}
export default ConversationSearch;