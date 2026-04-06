import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-100 dark:bg-gray-700/50 rounded w-3/4"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-700/50 rounded w-1/2"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-700/50 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
