import React, { memo } from "react";

const FilterBar = memo(
  ({
    searchTerm,
    onSearchChange,
    departmentFilter,
    onDepartmentChange,
    statusFilter,
    onStatusChange,
    departments,
    isSearchDebouncing,
    onClearFilters,
  }) => {
    return (
      <div className="filter-bar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
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
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="department-filter"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="status-filter"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {(searchTerm || departmentFilter || statusFilter) && (
            <button
              className="btn btn-delete clear-filters-btn"
              onClick={onClearFilters}
              style={{
                marginLeft: "10px",
                padding: "6px 16px",
                fontSize: "0.9rem",
                fontWeight: "500",
                borderRadius: "6px",
                transition: "all 0.2s",
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    );
  },
);

export default FilterBar;
