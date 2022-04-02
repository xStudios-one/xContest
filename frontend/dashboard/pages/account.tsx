import type { NextPage } from "next";
import { useEffect, useState } from "react";
import LoginForm from "../components/account/LoginForm";
import UserCard from "../components/account/UserCard";

const Account: NextPage = () => {
  const [authorization, setAuthorization] = useState<null | string>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setAuthorization(localStorage.getItem("Authorization"));
    setUsername(localStorage.getItem("Username") || "");
  }, []);

  // TODO: don't show anything unless useEffect fires

  return (
    <div>
      {authorization != null ? (
        <>
          <UserCard username={username} />
        </>
      ) : (
        <LoginForm
          onLogin={(token, username) => {
            setAuthorization(token);
            setUsername(username);
          }}
        />
      )}
    </div>
  );
};

export default Account;
