import moment from "moment";
import ConversationListItem from "./ConversationListItem";
import styled from "styled-components";
import Router from "next/router";

const ConversationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .conversation-head {
    text-align: center;
    font-weight: bold;
  }
`;
export default class ConversationList extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewConversationMessages();
  }

  organizeConversations(conversations) {
    const { currentUser, onClick } = this.props;
    return conversations.map((conversation) => {
      const conversationHasTextMessages = conversation.texts.length > 0;
      const lastTextMessage = conversationHasTextMessages
        ? conversation.texts[conversation.texts.length - 1]
        : null;
      const lastTextMessageAuthorIsMe =
        conversationHasTextMessages &&
        lastTextMessage.author.id === currentUser;
      const ConversationName = conversation.participants.filter((user) =>
        user.id !== currentUser ? user : null
      );
      return (
        <ConversationListItem
          key={conversation.id}
          user={ConversationName[0]}
          lastMessage={conversationHasTextMessages && lastTextMessage.text}
          lastAuthor={lastTextMessageAuthorIsMe && "You: "}
          when={
            conversationHasTextMessages &&
            moment(lastTextMessage.createdAt).fromNow()
          }
          onSelect={(e) => {
            Router.push(
              {
                pathname: "/messengerPage",
                query: { id: conversation.id },
              },
              undefined,
              { shallow: true }
            );
            onClick(conversation);
          }}
        />
      );
    });
  }
  render() {
    const { loading, error, conversations, emptyConversations } = this.props;
    // if (loading) return "Loading...";
    if (error) return error.toString();
    return (
      <ConversationSection>
        {conversations.length !== 0 ? (
          <React.Fragment>
            <div className="conversation-head">Conversations</div>
            {this.organizeConversations(conversations)}{" "}
          </React.Fragment>
        ) : null}
        {emptyConversations.length !== 0 ? (
          <React.Fragment>
            <div className="conversation-head">Friends</div>
            {this.organizeConversations(emptyConversations)}
          </React.Fragment>
        ) : null}
      </ConversationSection>
    );
  }
}
