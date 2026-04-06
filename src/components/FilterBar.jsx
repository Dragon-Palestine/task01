import React, { memo } from "react";

const FilterBar = memo(
  ({
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    departments,
    isSearchDebouncing,
  }) => {
    return (
      <div className="filter-bar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`search-input ${isSearchDebouncing ? "searching" : ""}`}
          />
          {isSearchDebouncing && (
            <div className="search-indicator">
              <div className="search-spinner"></div>
            </div>
          )}
        </div>
        <div className="filter-container">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="department-filter"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  },
);

export default FilterBar;
