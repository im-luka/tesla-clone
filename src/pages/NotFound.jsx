import React from "react";
import Loading from "../components/loading/Loading";

const NotFound = () => {
  return (
    <div className="notfound">
      <Loading text="Page you are looking for is not found!" />
    </div>
  );
};

export default NotFound;
