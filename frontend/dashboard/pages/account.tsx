import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../components/account/LoginForm";
import UserCard from "../components/account/UserCard";
import { RootState } from '../app/store';

const Account: NextPage = () => {
  const [authorization, setAuthorization] = useState<null | string>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const isLogged = useSelector((state: RootState) => state.login.isLogged);

  useEffect(() => {
    setAuthorization(localStorage.getItem("Authorization"));
    setUsername(localStorage.getItem("Username") || "");
    setEmail(localStorage.getItem("Email") || "");
  }, []);

  // TODO: don't show anything unless useEffect fires

  return (
    <div>
      {isLogged ? (
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
