import gql from "graphql-tag";

const MAIN_SEARCH_ENGINE_QUERY = gql`
  query MAIN_SEARCH_ENGINE_QUERY($searchTerm: String!){
      me{
          id
          name
          friends{
              id
              name
              title 
              company
          }
      }
    users(
        where: {
          OR: [{ name_contains: $searchTerm }, { email_contains: $searchTerm }]
        }
      ) {
        id
        name
        profilePic
        title 
        company
        email
      }
      searchContacts(searchTerm: $searchTerm) {
        id
        description
        email
        name
        title
        company
        contactPic
        createdAt
        owner {
          id
          name
        }
        phone
      }
    allPosts(
        where: {
          OR: [{ company_contains: $searchTerm }, { content_contains: $searchTerm }]
        }
      ) {
        id
        company
        content
        likes {
          id
          user {
            id
          }
        }
        reportedBy{
          reportedBy{
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
          friends {
            id
          }
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
      searchFriends(searchTerm: $searchTerm){
          id
          name
          title 
          company
          profilePic
          friends{
              id
              name
              title 
              company
              profilePic
          }
        }
    
  }
`;

export default MAIN_SEARCH_ENGINE_QUERY;