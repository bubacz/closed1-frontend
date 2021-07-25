import gql from "graphql-tag";

export default gql`
  mutation createConversation($participant: ID!, $text: String) {
    createConversation(participant: $participant, text: $text) {
      id
      participants {
        id
        name
      }
      texts {
        id
        text
        createdAt
        author {
          id
          name
        }
      }
    }
  }
`;
