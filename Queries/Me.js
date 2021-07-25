import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      active
      profilePic
      coverPic
      name
      stripeId
      subscriptionId
      permissions
      contacts {
        id
      }
      conversations {
        id
        participants {
          id
          name
        }
        texts {
          id
          author {
            id
          }
          text
        }
      }
      posts {
        id
        company
        content
        likes {
        id
        user {
          id
        }
      }
        createdAt
        updatedAt
        author {
          id
          name
          title
          company
          profilePic
        }
      comments {
          id
          content
          createdAt
          author {
            id
            name
            profilePic
          }
          replies (orderBy: createdAt_ASC){
            id
            content
            createdAt
            author {
              id
              name
              profilePic
            }
          }
        }
        visible
      }
      friends {
        id
        name
        email
        title
        company
      }
      sent {
        id
        name
        email
      }
      received {
        id
        name
        email
        title
        company
      }
      settings
      status
      phone
      city
      country
      state
      title
      company
      territory
      targetBuyers
    }
  }
`;
