import React from "react";
import { Query, Mutation } from "react-apollo";
import moment from "moment";
import SearchInput from "../components/SearchInput";
import ConversationList from "../components/ConversationList";
import Conversation from "../components/Conversation";
import MY_CONVERSATIONS_QUERY from "../graphql/queries/myConversations";
import SEND_TEXT_MESSAGE_MUTATION from "../graphql/mutations/sendTextMessage";
import TEXT_ADDED_SUBSCRIPTION from "../graphql/subscriptions/text";
import { Messaging, TextMessageList } from "../components/MessengerStyles";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ConversationListItemstyle } from "../components/ConversationListItem";
import { sortByRecentMessages } from "../../lib/DateTimeUtils";

const contexts = {
  CONVERSATION: "CONVERSATION",
  USER: "USER",
};

class Messenger extends React.Component {
  state = {
    msgLoading: false,
    selectedConversationId: "",
    searchInput: "",
    context: {
      name: null,
      id: null,
      data: {},
    },
  };

  componentDidMount() {
    const id = window.location.href.split("=")[1];
    if (id) {
      this.setState({ selectedConversationId: id });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const id = window.location.href.split("=")[1];
      if (id) {
        this.setState({ selectedConversationId: id });
      }
    }
  }

  setContextForSelectedUser(conversations) {
    const { selectedConversationId } = this.state;
    if (selectedConversationId) {
      const [selectedChat] = conversations.filter((conversation) => {
        if (conversation.id === selectedConversationId) {
          return conversation;
        }
        return null;
      });
      return {
        name: contexts.CONVERSATION,
        id: selectedConversationId,
        data: selectedChat,
      };
    }
    return this.state.context;
  }

  getSearchInput() {
    return (
      <SearchInput
        onChange={(searchInput) => {
          this.setState(
            (prevState) => ({
              ...prevState,
              searchInput,
            }),
            () => {
              console.error("this search state", this.state);
            }
          );
        }}
      />
    );
  }

  getConversationList() {
    return (
      <Query query={MY_CONVERSATIONS_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <LoadingSpinner />;
          if (data) {
            let oldConversations = [];
            let newConversations = [];
            const searchConversations = data.me.conversations.filter(
              (conversation) => {
                const [participant] = conversation.participants.filter((user) =>
                  user.id !== data.me.id ? user : null
                );
                if (this.state.searchInput !== "") {
                  return participant.name
                    .toUpperCase()
                    .includes(this.state.searchInput.toUpperCase())
                    ? conversation
                    : null;
                } else return conversation;
              }
            );
            searchConversations.filter((conversation) => {
              if (conversation.texts.length > 0) {
                oldConversations.push(conversation);
              } else {
                newConversations.push(conversation);
              }
            });
            oldConversations = sortByRecentMessages(oldConversations);
            let conversationsList;
            return (
              <ConversationList
                onClick={(conversation) => {
                  this.setState((prevState) => ({
                    ...prevState,
                    context: {
                      name: contexts.CONVERSATION,
                      id: conversation.id,
                      data: conversation,
                    },
                  }));
                }}
                {...{
                  loading,
                  error,
                  conversations: oldConversations,
                  emptyConversations: newConversations,
                  currentUser: data.me.id,
                }}
                subscribeToNewConversationMessages={() =>
                  subscribeToMore({
                    document: TEXT_ADDED_SUBSCRIPTION,
                    fetchPolicy: "network-only",
                    variables: {},
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      if (subscriptionData.data) {
                        const newText = subscriptionData.data.text.node;
                        const conversationExists = prev.me.conversations.filter(
                          (conversation) => {
                            return conversation.id === newText.conversation.id;
                          }
                        );

                        if (conversationExists.length > 0) {
                          // Add message to an existing conversation
                          const conversations = prev.me.conversations.map(
                            (conversation) => {
                              if (conversation.id === conversationExists.id) {
                                const { conversation: chat } = newText;
                                return {
                                  ...conversation,
                                  texts: chat.texts,
                                };
                              }

                              return conversation;
                            }
                          );
                          return {
                            ...prev,
                            me: {
                              ...prev.me,
                              conversations,
                            },
                          };
                        } 
                      }
                    },
                  })
                }
              />
            );
          }
        }}
      </Query>
    );
  }

  getTextMessageList() {
    return (
      <Query query={MY_CONVERSATIONS_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (loading) return <LoadingSpinner />;
          const conversations = data.me.conversations.map((conversation) => {
            let textMessages = [];
            if (this.state.searchInput !== "") {
              textMessages = conversation.texts.filter((textMessage) =>
                this.state.searchInput !== ""
                  ? textMessage.text
                      .toUpperCase()
                      .includes(this.state.searchInput.toUpperCase())
                  : null
              );
            } else textMessages = conversation.texts;
            return {
              ...conversation,
              texts: textMessages,
            };
          });
          return (
            <TextMessageList
              className={[
                "list-reset",
                this.state.searchInput === "" && "hidden",
              ].join(" ")}
            >
              <div className="section-head">Messages</div>
              {conversations.map((conversation) => (
                <div key={conversation.id}>
                  {conversation.texts.map((textMessage) => {
                    const [
                      participant,
                    ] = conversation.participants.filter((user) =>
                      user.id !== data.me.id ? user : null
                    );
                    return (
                      <ConversationListItemstyle
                        key={textMessage.id}
                        onClick={(e) => {
                          this.setState((prevState) => ({
                            ...prevState,
                            context: {
                              name: contexts.CONVERSATION,
                              id: conversation.id,
                              data: conversation,
                            },
                          }));
                        }}
                      >
                        <img
                          className="conversation-photo"
                          src={participant.profilePic}
                        />
                        <div className="conversation-info">
                          <h1 className="conversation-title">
                            {participant.name}
                          </h1>
                          <div style={{ display: "flex" }}>
                            <span className="conversation-snippet">
                              {data.me.id === textMessage.author.id
                                ? "You"
                                : textMessage.author.name}
                              : {textMessage.text}
                            </span>
                            <span className="timestamp">
                              {moment(textMessage.createdAt).fromNow()}
                            </span>
                          </div>
                        </div>
                      </ConversationListItemstyle>
                    );
                  })}
                </div>
              ))}
            </TextMessageList>
          );
        }}
      </Query>
    );
  }

  getConversationNotSelected() {
    return (
      <div className="flex-1 flex flex-col h-full items-center justify-center">
        {/* <div className="text-5xl">{randomEmoji()}</div> */}
        <div className="mt-6">Coding is awesome!</div>
      </div>
    );
  }

  getConversations() {
    return (
      <Mutation mutation={SEND_TEXT_MESSAGE_MUTATION}>
        {(sendTextMessage, { loading, error, data }) => (
          <Query query={MY_CONVERSATIONS_QUERY} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (data) {
                const context = this.setContextForSelectedUser(
                  data.me.conversations
                );
                return (
                  <React.Fragment>
                    {data.me.conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={[
                          context.name === contexts.CONVERSATION &&
                          context.id === conversation.id
                            ? "block"
                            : "hidden",
                        ].join(" ")}
                      >
                        <Conversation
                          conversation={conversation}
                          me={data.me.id}
                          loading={this.state.msgLoading}
                          onTextMessageSend={async (
                            text,
                            newMessageOfDay,
                            otherUser
                          ) => {
                            this.setState({msgLoading: true});
                            await sendTextMessage({
                              variables: {
                                conversationId: conversation.id,
                                text,
                                newMessage: newMessageOfDay,
                                otherUserName: otherUser.name,
                                otherUserEmail: otherUser.email,
                              },
                            });
                            this.setState({msgLoading: false});
                            this.getConversationList();
                          }}
                        />
                      </div>
                    ))}
                  </React.Fragment>
                );
              }
            }}
          </Query>
        )}
      </Mutation>
    );
  }

  render() {
    return (
      <Messaging>
        <div className="scrollable sidebar">
          <div>{this.getSearchInput()}</div>
          {this.getConversationList()}
          {this.getTextMessageList()}
        </div>
        <div className="scrollable content">
          <Query query={MY_CONVERSATIONS_QUERY} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) {
                return <LoadingSpinner />;
              }
              if (data) {
                return this.getConversations();
              }
            }}
          </Query>
        </div>
      </Messaging>
    );
  }
}

export default Messenger;
