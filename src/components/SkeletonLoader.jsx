import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="employee-card skeleton">
      <div className="card-header skeleton-header">
        <div className="skeleton-text"></div>
        <div className="skeleton-actions">
          <div className="skeleton-btn"></div>
          <div className="skeleton-btn"></div>
        </div>
      </div>
      <div className="card-body">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
