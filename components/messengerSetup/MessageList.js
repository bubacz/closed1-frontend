import React from "react";
import styled from "styled-components";
import Compose from "./Compose";
import Toolbar from "./Toolbar";
import Message from "./Message";
import moment from "moment";

const MessageContainer = styled.div`
  .conversation-section {
    display: flex;
    align-items: center;
    padding: 10px;
    position: relative;
    left: 40%;
  }
  .conversation-photo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  .conversation-title {
    font-size: 18px;
    font-weight: bold;
    text-transform: capitalize;
    margin: 0;
  }
  .box {
    padding: 10px;
    padding-bottom: 70px;
  }
`;

const EmptyConversation = styled.div`
    font-size: 24px;
    color: grey;
    position: fixed;
    left: 50%;
    top: 50%;
}`;

const MY_USER_ID = "apple";

class MessageList extends React.Component {
  state = {
    messageState: [],
    tempMessages: [],
  };

  componentDidMount() {
    this.messagesArray();
  }

  componentDidUpdate(prevprops) {
    if (this.props !== prevprops) {
      this.messagesArray();
    }
  }

  messagesArray = () => {
    if(this.props.conversation){
      const chatTranscription = this.props.conversation.messages;
    this.setState({ messageState: chatTranscription }, () => {
      this.messagesOrganized();
    });
  }
  };

  messagesOrganized = (newMessages) => {
    let i = 0;
    let messages = []
    messages = this.state.messageState;
    if (newMessages) {
      // console.log('messages', 'old msgs' , messages , 'AND new msgs' , newMessages );
      messages = messages.concat(newMessages);
    }
    this.setState({ messageState: messages });

    if (messages) {
      let oldMessages = [];
      let messageCount = messages.length;
      if(messageCount>0){
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
         <EmptyConversation 
         key={i}>
           Start a Conversation with {this.props.conversation.name}
         </EmptyConversation>)
       ;
     }
      this.setState({ tempMessages: oldMessages });
    } 
  };

  postNewMessage = (newMessage) => {
    this.messagesOrganized(newMessage);
  };

  render() {
    const { conversation } = this.props;
    if (conversation) {
      return (
        <MessageContainer>
          {/* <Toolbar
            title="Conversation Title"
            leftItems={<img src={conversation.photo} />}
            rightItems={conversation.name}
          /> */}
          <div className="conversation-section">
            <img
              className="conversation-photo"
              src={conversation.profilePic}
            />
            <h1 className="conversation-title">{conversation.name}</h1>
          </div>
          <hr />
          <div className="box">{this.state.tempMessages}</div>

          <Compose onSendMessage={this.postNewMessage} chatId={this.props.conversation.id} me={this.props.me}/>
        </MessageContainer>
      );
    }
    return (
      <EmptyConversation>
        Start or Select a Conversation with your Closed1{" "}
      </EmptyConversation>
    );
  }
}

export default MessageList;
