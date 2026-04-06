import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-row">
        <div className="skeleton-left">
          <div className="skeleton-circle" />
          <div className="skeleton-block skeleton-title" />
        </div>
        <div className="skeleton-actions">
          <div className="skeleton-block skeleton-btn" />
          <div className="skeleton-block skeleton-btn" />
        </div>
      </div>
      <div className="skeleton-lines">
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
