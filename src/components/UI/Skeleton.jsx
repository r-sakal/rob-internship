import React from "react";

const Skeleton = ({ width, height, borderRadius, className = "", style = {} }) => {
  return (
    <div
      className={`skeleton-box ${className}`.trim()}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    ></div>
  );
};

export default Skeleton;
