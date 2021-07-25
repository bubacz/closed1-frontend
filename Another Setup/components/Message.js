import React from "react";
import styled, { keyframes } from "styled-components";
import moment from "moment";
import { getTimeStampUtil } from "../../lib/DateTimeUtils";
import { fadeInLeft, fadeInRight } from "react-animations";

const fadeInLeftAnimation = keyframes`${fadeInLeft}`;
const fadeInRightAnimation = keyframes`${fadeInRight}`;
const fadeInLeftDiv = styled.div`
  animation: 0.5s ${fadeInLeftAnimation};
`; 
const fadeInRightDiv = styled.div`
  animation: 0.5s ${fadeInRightAnimation};
`;

const MessageStyle = styled.div`
  .message {
    display: flex;
    flex-direction: column;
  }

  .message .timestamp {
    display: flex;
    justify-content: center;
    color: #999;
    font-weight: 600;
    font-size: 12px;
    margin: 10px 0px;
    text-transform: uppercase;
  }

  .message .bubble-container {
    font-size: 14px;
    display: flex;
  }

  .message.mine .bubble-container {
    justify-content: flex-end;
  }

  .message.start .bubble-container .bubble {
    /* margin-top: 10px; */
    border-top-left-radius: 20px;
  }

  .message.end .bubble-container .bubble {
    border-bottom-left-radius: 20px;
    /* margin-bottom: 10px; */
  }

  .message.mine.start .bubble-container .bubble {
    margin-top: 10px;
    border-top-right-radius: 20px;
  }

  .message.mine.end .bubble-container .bubble {
    border-bottom-right-radius: 20px;
    margin-bottom: 10px;
  }

  .message .bubble-container .bubble {
    margin: 1px 0px;
    background: #f5f5f5;
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 75%;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .message.mine .bubble-container .bubble {
    background: ${(props) => props.theme.green};
    color: white;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
`;

class Message extends React.Component {
  render() {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
    } = this.props;
    const friendlyTimestamp = moment(data.timestamp).format("LLLL");
    const AnimatedDiv = isMine ? fadeInRightDiv : fadeInLeftDiv;
    return (
      <MessageStyle>
        <AnimatedDiv>
        <div
          className={[
            "message",
            `${isMine ? "mine" : ""}`,
            `${startsSequence ? "start" : ""}`,
            `${endsSequence ? "end" : ""}`,
          ].join(" ")}
        >
          {showTimestamp && (
            <div className="timestamp">{getTimeStampUtil(data.createdAt)}</div>
          )}
          <div className="bubble-container">
            <div className="bubble" title={friendlyTimestamp}>
              {data.text}
            </div>
          </div>
          </div>
          </AnimatedDiv>
      </MessageStyle>
    );
  }
}

export default Message;
