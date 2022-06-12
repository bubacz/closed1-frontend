import React from "react";
import styled from "styled-components";
// import Compose from "../../components/messengerSetup/Compose";
// import Toolbar from "../../components/messengerSetup/Toolbar";
import Message from "./Message";
import moment from "moment";

const MessageContainer = styled.div`
  padding-bottom: 75px;
  
  .conversation-title {
    font-size: 18px;
    font-weight: bold;
    text-transform: capitalize;
    margin: 0;
  }
`;

const EmptyConversation = styled.div`
    font-size: 24px;
    color: grey;
    position: absolute;
    left: 40%;
    top: 50%;
}`;

class MessageList extends React.Component {
  state = {
    messageState: [],
    tempMessages: [],
  };

  componentDidMount() {
    const { messages, me } = this.props;
    if (messages) {
      this.messagesOrganized(messages);
    }
  }

  componentDidUpdate(prevprops) {
    const { messages } = this.props;
    if (this.props !== prevprops) {
      this.messagesOrganized(messages);
    }
  }
  
  messagesOrganized = (messages) => {
    let i = 0;
    if (messages && messages.length > 0) {
      let oldMessages = [];
      let messageCount = messages.length;
      if (messageCount > 0) {
        while (i < messageCount) {
          let previous = messages[i - 1];
          let current = messages[i];
          let next = messages[i + 1];
          let isMine = current.author.id === this.props.me;
          let currentMoment = moment(current.createdAt);
          let prevBySameAuthor = false;
          let nextBySameAuthor = false;
          let startsSequence = true;
          let endsSequence = true;
          let showTimestamp = true;

          if (previous) {
            let previousMoment = moment(previous.createdAt);
            let previousDuration = moment.duration(
              currentMoment.diff(previousMoment)
            );
            prevBySameAuthor = previous.author.id === current.author.id;
            if (prevBySameAuthor && previousDuration.as("hours") < 1) {
              startsSequence = false;
            }
            if (previousDuration.as("hours") < 1) {
              showTimestamp = false;
            }
          }

          if (next) {
            let nextMoment = moment(next.createdAt);
            let nextDuration = moment.duration(nextMoment.diff(currentMoment));
            nextBySameAuthor = next.author.id === current.author.id;

            if (nextBySameAuthor && nextDuration.as("hours") < 1) {
              endsSequence = false;
            }
          }

          oldMessages.push(
            <Message
              key={i}
              isMine={isMine}
              startsSequence={startsSequence}
              endsSequence={endsSequence}
              showTimestamp={showTimestamp}
              data={current}
            />
          );

          // Proceed to the next message.ß
          i += 1;
        }
      } else {
        oldMessages.push(
          <EmptyConversation key={i}>
            Start a Conversation with {this.props.conversation.name}
          </EmptyConversation>
        );
      }
      this.setState({ tempMessages: oldMessages });
    }
  };

  postNewMessage = (newMessage) => {
    this.messagesOrganized(newMessage);
  };

  render() {
    const { messages, user } = this.props;
    if (messages.length > 0) {
      return (
        <MessageContainer>
          {this.state.tempMessages}
        </MessageContainer>
      );
    }
    return <EmptyConversation >
    Start a Conversation with {user.name}
  </EmptyConversation>;
  }
}

export default MessageList;
