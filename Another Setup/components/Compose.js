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
    messageContent: "",
    data: "",
    createMessage:{

    },
  };

  handleChange = (event) => {
    const message = event.target.value;
    const timestamp = Date.now();
    const sentTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timestamp);
    const data = [
      {
        author: { id: this.props.me },
        content: message,
        timestamp: sentTime,
      },
    ];
    const createMessage = {
      author: this.props.me,
      conversation: this.props.chatId,
      content: message,
    };
    this.setState({ data: data });
    this.setState({ createMessage: createMessage });
    this.setState({ messageContent: message });
  };
  
  render() {
    return (
      <ComposeStyle>
      <Mutation
        mutation={CREATE_NEW_MESSAGE}
        variables={this.state.createMessage}
      >
        {(createMessage, { loading, error }) => (
            <div className="compose">
              <input
                type="text"
                className="compose-input"
                placeholder="Type a message, @name"
                value={this.state.messageContent}
                onChange={this.handleChange}
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
              {this.props.rightItems}
            </div>
        )}
      </Mutation>
          </ComposeStyle>
    );
  }
}
export default Compose;
