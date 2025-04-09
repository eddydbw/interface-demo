import React from "react";
import "./Frame.css";

export const Frame = ({ className = "", text = "HR", text1 = "160" }) => {
  return (
    <div className={`frame-container ${className}`}>
      <div className="frame-text">{text}</div>
      <div className="frame-number">{text1}</div>
    </div>
  );
};