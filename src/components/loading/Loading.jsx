import React from "react";
import { Triangle } from "react-loader-spinner";
import "./loading.scss";

const Loading = ({ text }) => {
  return (
    <div className="loading">
      <Triangle width={125} height={125} color="#171a20" />
      <h2>{text}</h2>
    </div>
  );
};

export default Loading;
