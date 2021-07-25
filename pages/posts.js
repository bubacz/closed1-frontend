import React from "react";
import HomePage from "../components/NewsFeed/HomePage";
import PleaseSignIn from "../components/PleaseSignIn";

const Home = (props) => (
  <PleaseSignIn>
    <HomePage />
  </PleaseSignIn>
);
export default Home;
