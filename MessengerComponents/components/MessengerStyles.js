import styled from "styled-components";

export const Search = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Messaging = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 350px auto;
  grid-template-rows: 60px auto 60px;
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  .container {
    padding: 10px;
  }
  .scrollable {
    height: calc(100vh - 61px - 4rem); /* Viewport height - navbar height - inner top and bottom padding */
    position: relative;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .sidebar {
    // background: white;
    grid-row-start: 1;
    grid-row-end: span 3;
    padding: 0 1rem;
  }
  .content {
    height: calc(100vh - 61px - 77px - 2rem); /* Viewport height - navbar height - inner top padding */
    // background: white;
    grid-row-start: 1;
    grid-row-end: span 3;
  }
  .vertical-line {
    position: absolute;
    top: 8rem;
    left: 370px;
    border-left: 1px solid #ccc;
  }
  .footer {
    grid-column-start: 2;
    // background: white;
  }
  .hidden {
    display: none;
  }
  .block {
    display: block;
  }
`;

export const ConversationRightTile = styled.div`
  display: grid;
`;

export const ConversationHeader = styled.div`
  .conv-header {
    position:relative;
    // background: white;
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 2px solid #defffc;
    display: flex;
  }
  .conversation-photo {
    display: block;
    // background: ${props=> props.theme.offWhite};
    border: 2px solid ${props=> props.theme.lightgreen};
    width: 75px;
    height: 75px;
    border-radius: 50%;
    margin-left: 45%;
    object-fit: cover;
  }

  .conversation-title {
    align-self: center;
    font-size: 28px;
    font-weight: bold;
    text-transform: capitalize;
    margin: 0;
  }
`;

export const ConversationBody = styled.div`
  display: block;
`;

export const ConversationFooter = styled.div`
  .compose {
    padding: 10px;
    display: flex;
    align-items: baseline;
    // background: white;
    border-top: 1px solid #eeeef1;
    position: fixed;
    width: calc(100% - 20px);
    bottom: 0px;
  }

  @supports (backdrop-filter: blur(20px)) {
    .compose {
      border: none;
      // background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
    }
  }

  .compose-input {
    border: 1px solid ${(props) => props.theme.green};
    width: 75%;
  }

  .compose-input::placeholder {
    opacity: 0.3;
  }

  .compose .toolbar-button {
    color: white;
    font-size: 18px;
    border: solid ${(props) => props.theme.green};
    background: ${(props) => props.theme.green};
    width: 60px;
    height: 40px;
    text-align: center;
    margin: 5px;
  }
  .compose .disabled-button{
    color: ${(props) => props.theme.green};
    background: #f5f5f5;
    font-size: 18px;
    border: solid ${(props) => props.theme.lightGreen};
    width: 60px;
    height: 40px;
    text-align: center;
    margin: 5px;
  }

  .compose .toolbar-button:hover {
    cursor: pointer;
    color: ${(props) => props.theme.green};
    // background: #fff;
  }
`;

export const TextMessageList = styled.div`
  padding-left: 10px;
  .section-head {
    text-align: center;
    font-weight: bold;
  }
`;
