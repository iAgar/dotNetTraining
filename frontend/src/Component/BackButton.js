import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const Navigation = useNavigate();

  const back = () => {
    Navigation(-1);
  };

  return (
    <button
      style={{
        width: "100px",
        height: "50px",
        marginRight: "auto",
        display: "block",
      }}
      onClick={back}
      className="logout-button"
    >
      &#x2190; Back
    </button>
  );
};

export default BackButton;
