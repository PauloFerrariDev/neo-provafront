import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <AiOutlineLoading3Quarters className="icon" />
    </div>
  );
};

export default Loading;
