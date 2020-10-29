import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp } from "@aws-amplify/ui-react";

const MyAmplifyAuthenticator = () => {

  return <AmplifyAuthenticator usernameAlias="email" style={{display: 'inline-block', marginTop: 25}}>

    <AmplifySignUp slot="sign-up"
      formFields={[
        {
          type: 'name',
          label: 'Name *',
          placeholder: 'Enter your name',
        },
        {
          type: 'username',
          label: 'Email Address *',
          placeholder: 'Enter your email',
        },
        {
          type: 'password',
        },
      ]}
    />

  </AmplifyAuthenticator>;
}

export default MyAmplifyAuthenticator;
