import type { NextPage } from "next";
import { useEffect, useState } from "react";
import LoginForm from "../components/account/LoginForm";
import UserCard from "../components/account/UserCard";

const Account: NextPage = () => {
  const [authorization, setAuthorization] = useState<null | string>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setAuthorization(localStorage.getItem("Authorization"));
    setUsername(localStorage.getItem("Username") || "");
    setEmail(localStorage.getItem("Email") || "");
  }, []);

  // TODO: don't show anything unless useEffect fires

  return (
    <div>
      {authorization != null ? (
        <>
          <UserCard username={username} email={email} />
        </>
      ) : (
        <LoginForm
          onLogin={(token, username, email) => {
            setAuthorization(token);
            setUsername(username);
            setEmail(email);
          }}
        />
      )}
    </div>
  );
};

export default Account;
