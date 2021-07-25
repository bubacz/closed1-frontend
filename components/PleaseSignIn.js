import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "../Queries/Me";
import Signin from "./Signin";
import RequestReset from "../components/RequestReset";
// import SocialLogin from './SocialLogin';
// import { GoogleLogin } from 'react-google-login';
import styled from "styled-components";
import Link from "next/link";
import Closed1Button from "./styles/Closed1Button";
import LoadingSpinner from "../components/LoadingSpinner";

const MainForm = styled.div`
  // display: block;
  width: 60%;
  padding: 1rem;
  position: absolute;
  left: 20%;
  justify-self: center;
  button {
    float: none;
  }
`;

const PleaseSignIn = (props) => (
  <Query query={CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
    {({ data, loading }) => {
      if (loading) return <LoadingSpinner />;
      if (!data.me) {
        return (
          <MainForm>
            <p>Please Log In before Continuing</p>
            <Signin />
            <div>
              Don't Have An Account? &nbsp;
              <span>
                <Link href="/signup">
                  <Closed1Button>SIGN UP</Closed1Button>
                </Link>
              </span>
              <br />
            </div>
            <div>
              <RequestReset />
            </div>
            {/* <SocialLogin /> */}
          </MainForm>
        );
      }
      if (data.me) {
        if (data.me.active) {
          return props.children;
        }
        return (
          <h2>
            {" "}
            we've sent you an email with instructions to activate your account
          </h2>
        );
      }
    }}
  </Query>
);

export default PleaseSignIn;
