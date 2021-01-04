import React from "react";
import { AlertProps } from "./models";

const Alert: React.FC<AlertProps> = ({ role, text }) => {
  return <div className={`alert-${role}`}>{text}</div>;
};

export default Alert;
