import React from "react";
import ComposeStyle from "./ComposeStyle";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { GET_CONVERSATIONS_QUERY } from "./GetConversations";
const CREATE_NEW_MESSAGE = gql`
  mutation CREATE_NEW_MESSAGE(
    $conversation: ID!
    $author: ID!
    $content: String!
  ) {
    createMessage(
      conversation: $conversation
      author: $author
      content: $content
    ) {
      id
      conversation {
        id
      }
      author {
        id
      }
      content
    }
  }
`;

class Compose extends React.Component {
  state = {
    text: "",
  };

  render() {
    const { onTextMessageSend } = this.props;
    return (
      <ComposeStyle>
        <div className="compose">
          <input
            type="text"
            className="compose-input"
            placeholder="Type a message, @name"
            value={this.state.messageContent}
            onChange={(e) => this.setState({ text: e.target.value })}
            onKeyPress={(e) => {
              const text = e.target.value;
              if (e.key === "Enter" && text !== "") {
                e.preventDefault();
                onTextMessageSend && onTextMessageSend(text);
                this.setState({ text: "" });
              }
            }}
          />
          <div
            type="submit"
            className="toolbar-button"
            onClick={async () => {
              this.props.onSendMessage(this.state.data);
              this.setState({ messageContent: "" });
              await createMessage();
              // window.location.reload();
            }}
          >
            send
          </div>
        </div>
      </ComposeStyle>
    );
  }
}
export default Compose;
