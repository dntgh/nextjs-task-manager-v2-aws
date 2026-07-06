import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID || '',
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_APP_CLIENT_ID || '',
      loginWith: {
        email: true
      }
    }
  }
});

export const initAuth = () => {
  // Ensure Amplify is successfully configured and retrieve the current config state
  return Amplify.getConfig();
};