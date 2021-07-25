import React, { Component } from 'react';

import { GoogleLogin } from 'react-google-login';

class SocialLogin extends Component {

  render() {

    return (
      <div>
        <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Login"
              cookiePolicy={'single_host_origin'}
            />
            <div>google test</div>
      </div>
    );
  }
}

export default SocialLogin;

// const GOOGLE_BUTTON_ID = "google-sign-in-button";

// class GoogleSignIn extends React.Component {
//   componentDidMount() {
//     window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
//       width: 200,
//       height: 50,
//       onsuccess: this.onSuccess
//     });
//   }

//   onSuccess(googleUser) {
//     const profile = googleUser.getBasicProfile();
//     console.log("Name: " + profile.getName());
//   }

//   render() {
//     return <div id={GOOGLE_BUTTON_ID} />;
//   }
// }

// export default GoogleSignIn;