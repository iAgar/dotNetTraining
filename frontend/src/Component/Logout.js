import React, { useContext } from "react";
import { UserContext } from "../Pages/userContext";

const Logout = () => {
  const userDetails = useContext(UserContext);
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      {userDetails && (
        <button
          style={{ width: "100px", height: "50px", marginBottom: "2rem" }}
          onClick={logout}
          className="logout-button"
          type="button"
        >
          Log Out
        </button>
      )}
    </>
  );
};
export default Logout;
