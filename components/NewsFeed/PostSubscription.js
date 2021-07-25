import gql from "graphql-tag";

export default gql`
  subscription onPostAdded {
    posts {
      mutation
      node {
        id
        createdAt
        updatedAt
        comments {
          id
          author {
            id
            name
            profilePic
          }
          content
        }
        company
        content
        likes {
        id
        user {
          id
        }
      }
        author {
          id
          name
          profilePic
          title
          company
          email
          friends {
            id
          }
        }
        visible
      }
    }
  }
`;
