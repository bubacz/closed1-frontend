import gql from "graphql-tag";

export default gql`
  subscription onTextAdded {
    text {
      mutation
      node {
        id
        text
        createdAt
        author {
          id
          name
        }
        conversation {
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
    }
  }
`;
