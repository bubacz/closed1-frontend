import MessageList from "./MessageList";
import { getTimeSinceLastMesssage } from "../../lib/DateTimeUtils";
import styled from "styled-components";
import {
  ConversationHeader,
  ConversationRightTile,
  ConversationBody,
  ConversationFooter,
} from "./MessengerStyles";
import Loader from "react-loader-spinner";
import User from "../../Assets/user.png";

const Item = styled.div`
	height: 40px;
	width: 60px;
	z-index: 2;
	position: fixed;
	bottom: 23px;
	right: 5px;
	opacity: 75%;
	text-align: center;
	path{
		stroke-width: 4;
	}
`;

export default class Conversation extends React.Component {
  state = { text: "", otherUser: "" };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  renderConversationHeader() {
    const { conversation, me } = this.props;
    const user = conversation.participants.filter((participant) => {
      if (participant.id !== me) {
        return participant;
      }
      return null;
    });
    return (
      <ConversationHeader data-aos="fade-left" data-aos-duration="500">
        <div className="conv-header">
          <img className="conversation-photo" src={user[0].profilePic || User} />
          <span className="conversation-title"> &nbsp;{user[0].name}</span>
        </div>
      </ConversationHeader>
    );
  }

  getOtherUser = () => {
    const { conversation, me } = this.props;
    const [user] = conversation.participants.filter((participant) => {
      if (participant.id !== me) {
        return participant;
      }
      return null;
    });
    return user;
  };

  renderConversationBody() {
    const { conversation, me } = this.props;
    return (
      <ConversationBody>
        <MessageList
          messages={conversation.texts}
          me={me}
          user={this.getOtherUser()}
        />
      </ConversationBody>
    );
  }

  renderConversationFooter = () => {
    const { onTextMessageSend, conversation, loading } = this.props;
    let newMessageOfDay = true;
    if (conversation.texts.length > 0) {
      newMessageOfDay = getTimeSinceLastMesssage(
        conversation.texts.slice(-1)[0].createdAt
      );
    }
    const otherUserInfo = this.getOtherUser();
    return (
      <ConversationFooter>
        <div
          ref={(el) => {
            this.messagesEnd = el;
          }}
        />
        <div className="compose-wrapper">
          <div className="compose">
          <input
            disabled={loading}
            type="text"
            autoFocus
            className="compose-input form-control"
            placeholder="Type a message"
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
            onKeyPress={(e) => {
              const text = e.target.value;
              if (e.key === "Enter" && text !== "") {
                e.preventDefault();
                onTextMessageSend &&
                  onTextMessageSend(text, newMessageOfDay, otherUserInfo);
                this.setState({ text: "" });
              }
            }}
          />
          <button
            type="submit"
            className={`${loading ? "disabled-button" : "toolbar-button"}`}
            disabled={loading}
            onClick={async (e) => {
              if(this.state.text !== ""){
              e.preventDefault();
              onTextMessageSend &&
                onTextMessageSend(
                  this.state.text,
                  newMessageOfDay,
                  otherUserInfo
                );
              this.setState({ text: "" });}
            }}
          >
            send
          </button>
          {loading ? (
            <Item>
              <Loader
                type="TailSpin"
                color="#26A69A"
                height={30}
                width={30}
                // timeout={100000} //3 secs
              />
            </Item>
          ) : (
            ""
          )}
          </div>
        </div>
      </ConversationFooter>
    );
  };

  render() {
    return (
      <ConversationRightTile>
        {this.renderConversationHeader()}
        {this.renderConversationBody()}
        {this.renderConversationFooter()}
      </ConversationRightTile>
    );
  }
}
