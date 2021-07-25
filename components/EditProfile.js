import React, { Component } from "react";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../Queries/Me";
import ProfileForm from "./ProfileForm";
import LoadingSpinner from "../components/LoadingSpinner";

const EditProfile = (props) => (
  <Query query={CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
    {({ data, loading }) => {
      if (loading) return <LoadingSpinner />;
      if (data.me) {
        return <ProfileForm data={data.me} />;
      }
      return props.children;
    }}
  </Query>
);

export default EditProfile;
