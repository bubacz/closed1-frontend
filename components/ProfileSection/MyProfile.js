import React from "react";
import { Query } from "react-apollo";
import Error from "../ErrorMessage";
import ProfileTemplate from "./ProfileTemplate";
import LoadingSpinner from "../LoadingSpinner";
import { CURRENT_USER_QUERY } from "../../Queries/Me"

const User = () => (
  <Query query={CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
    {({ error, loading, data }) => {
      if (error) return <Error error={error} />;
      if (loading) return <LoadingSpinner />;
      if (!data.me) return <p>No User Found</p>;
      const user = data.me;
      return <ProfileTemplate user={user} />;
    }}
  </Query>
);

export default User;
