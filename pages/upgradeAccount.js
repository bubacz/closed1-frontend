import React, { Component } from "react";
import PleaseSignIn from "../components/PleaseSignIn";
import ModifySubscription from "../components/ModifySubscription";

const upgradeAccount = ({ query }) => (
  <PleaseSignIn>
    <ModifySubscription status={query.status} customerId={query.customer} />
  </PleaseSignIn>
);

export default upgradeAccount;
