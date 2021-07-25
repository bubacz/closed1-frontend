import gql from "graphql-tag";

export default gql`
  {
    me {
      id
      conversations {
        id
        participants {
          id
          name
          profilePic
          email
        }
        texts {
          id
          text
          createdAt
          author {
            id
            name
            profilePic
          }
        }
      }
    }
  }
`;
