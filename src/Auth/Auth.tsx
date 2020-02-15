import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../store/firebase";

import { SignInForm, Credentials } from "../SignInForm";
import App from "../App";

export const Auth = () => {
  const fbAuth = useAuth();
  const [user, initialising, error] = useAuthState(fbAuth);

  const login = React.useCallback(
    ({ email, password }: Credentials) => {
      fbAuth.signInWithEmailAndPassword(email, password);
    },
    [fbAuth]
  );

  if (initialising) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return <App />;
  }
  return (
    <main>
      <SignInForm onSubmit={login} />
    </main>
  );
};
