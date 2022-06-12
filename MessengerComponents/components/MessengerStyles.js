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

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

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
    border-right: 1px solid #ccc;
    
    @media (max-width: 768px) {
      height: auto;
      border-right: 0;
    }
  }
  .content {
    height: calc(100vh - 61px - 77px - 2rem); /* Viewport height - navbar height - inner top padding */
    // background: white;
    grid-row-start: 1;
    grid-row-end: span 3;
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
  .compose-wrapper {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }
  
  .compose {
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    max-width: ${props => props.theme.siteWidth};
    margin: 0 auto;
    padding: 1.5rem 2rem;
    border-top: 1px solid #eeeef1;
    gap: 1.5rem;
    // background: white;

    @supports (backdrop-filter: blur(20px)) {
      border: none;
      // background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
    }

    >* {
      margin: 0;
    }

    .toolbar-button,
    .disabled-button {
      padding: 0 3rem;
      border: solid ${(props) => props.theme.green};
      font-size: 18px;
      text-align: center;
    }

    .toolbar-button {
      color: white;
      cursor: pointer;
      background: ${(props) => props.theme.green};
    }

    .disabled-button{
      color: ${(props) => props.theme.green};
      background: #f5f5f5;
    }
  }

  .compose-input {
    border: 1px solid ${(props) => props.theme.green};

    &::placeholder {
      opacity: 0.3;
    }
  }
`;

export const TextMessageList = styled.div`
  padding-left: 10px;
  .section-head {
    text-align: center;
    font-weight: bold;
  }
`;
