import gql from "graphql-tag";

export default gql`
  mutation sendTextMessage(
    $conversationId: ID!
    $text: String!
    $newMessage: Boolean
    $otherUserName: String
    $otherUserEmail: String
  ) {
    sendTextMessage(
      conversationId: $conversationId
      text: $text
      newMessage: $newMessage
      otherUserName: $otherUserName
      otherUserEmail: $otherUserEmail
    ) {
      id
      text
    }
  }
`;
