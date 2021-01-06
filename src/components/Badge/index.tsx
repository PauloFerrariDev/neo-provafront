import React from "react";
import { BadgeProps } from "./types";

const Badge: React.FC<BadgeProps> = ({ type, clickable, onClick }) => {
  return (
    <div
      className={`badge-${type}${clickable ? "-clickable" : ""}`}
      onClick={() => onClick && onClick(type)}
    >
      {type}
    </div>
  );
};

export default Badge;
