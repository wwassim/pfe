import React from "react";
import { useSelector } from "react-redux";
import Dash from "./Dash";
import UsersDash from "./UsersDash";

const Welcome = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  return (
    <>
      {isLoading ? (
        <p>Loading ....</p>
      ) : (
        <div>
          <h1 className="title">Dashboard</h1>
          <h2 className="subtitle">
            Welcome Back <strong>{user && user.name}</strong>
          </h2>
          {user && user.role.name === "admin" && <Dash user={user} />}
          {user && user.role.name !== "admin" && <UsersDash user={user} />}
        </div>
      )}
    </>
  );
};

export default Welcome;
