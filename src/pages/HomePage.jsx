import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useTheme } from "../context/ThemeContext";
import { useEmployeeFilters } from "../hooks/useEmployeeFilters";
import { useEmployeeOperations } from "../hooks/useEmployeeOperations";
import { useModalManager } from "../hooks/useEmployeeOperations";
import { useInitialLoading } from "../hooks/useEmployeeOperations";
import { useUrlSync } from "../hooks/useUrlSync";
import EmployeeCard from "../components/EmployeeCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import SkeletonLoader from "../components/SkeletonLoader";
import Modal from "../components/Modal";
import EmployeeForm from "../components/EmployeeForm";
// Removed unused imports
import { LOADING_MESSAGES } from "../constants";

const HomePage = React.memo(() => {
  const {
    data: employees, // Use 'data' as the state property name as requested
    currentPage,
    filters,
    isLoading,
    filteredEmployees,
    paginatedEmployees,
    paginationInfo,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    deleteAllEmployees,
    generateEmployees,
    setFilter,
    changePage,
  } = useEmployeeContext();

  const { isDarkMode, toggleTheme } = useTheme();

  // URL synchronization
  const {
    goToPage,
    setSearchFilter,
    setDepartmentFilter,
    setStatusFilter,
    clearFilters,
    localSearch,
    isSearchDebouncing: isSyncDebouncing,
  } = useUrlSync();

  // Keep only necessary hooks and unify logic
  const { departments } = useEmployeeFilters(employees);

  const {
    isLoading: operationsLoading,
    addEmployee: handleAddEmployee,
    updateEmployee: handleUpdateEmployee,
    deleteEmployee: handleDeleteEmployee,
    deleteAllEmployees: handleDeleteAllEmployees,
    generateEmployees: handleGenerateEmployees,
  } = useEmployeeOperations({
    addEmployee,
    updateEmployee,
    deleteEmployee,
    deleteAllEmployees,
    generateEmployees,
  });

  const {
    showModal,
    editingEmployee,
    isPreparingModal,
    openAddModal,
    openEditModal,
    closeModal,
  } = useModalManager();

  const isInitialLoading = useInitialLoading();

  const [generateCount, setGenerateCount] = useState(10);

  // Memoized computed values moved up to be used by handlers
  const employeeCount = useMemo(() => employees?.length || 0, [employees]);
  const filteredCount = useMemo(
    () => filteredEmployees?.length || 0,
    [filteredEmployees],
  );
  const paginatedCount = useMemo(
    () => paginatedEmployees?.length || 0,
    [paginatedEmployees],
  );

  // Unified form submission handler to ensure modal closes on success
  const handleFormSubmit = useCallback(
    async (formData) => {
      if (editingEmployee) {
        // Ensure the ID is attached to the form data for the reducer to find the match
        await handleUpdateEmployee({ ...formData, id: editingEmployee.id });
      } else {
        await handleAddEmployee(formData);
      }
      closeModal(); // Close modal after successful async operation
    },
    [editingEmployee, handleUpdateEmployee, handleAddEmployee, closeModal],
  );

  // Simplified Page change
  const handlePageChange = useCallback(
    (page) => {
      changePage(page);
    },
    [changePage],
  );

  const handleEditEmployee = useCallback(
    (employee) => {
      openEditModal(employee);
    },
    [openEditModal],
  );

  const handleAddNewEmployee = useCallback(() => {
    openAddModal();
  }, [openAddModal]);

  const handleCloseModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleDeleteAllWrapper = useCallback(async () => {
    // Pass the count to confirmDeleteAll helper
    await handleDeleteAllEmployees(employeeCount);
  }, [handleDeleteAllEmployees, employeeCount]);

  const handleGenerateEmployeesWrapper = useCallback(async () => {
    await handleGenerateEmployees(generateCount);
  }, [handleGenerateEmployees, generateCount]);

  // Filter handlers with URL sync
  const handleSearchChange = useCallback(
    (search) => {
      setSearchFilter(search);
    },
    [setSearchFilter],
  );

  const handleDepartmentChange = useCallback(
    (department) => {
      setDepartmentFilter(department);
    },
    [setDepartmentFilter],
  );

  const handleStatusChange = useCallback(
    (status) => {
      setStatusFilter(status);
    },
    [setStatusFilter],
  );

  const handleClearFilters = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  const modalTitle = useMemo(
    () =>
      editingEmployee ? `Edit ${editingEmployee.name}` : "Add New Employee",
    [editingEmployee],
  );

  const themeTitle = useMemo(
    () => (isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"),
    [isDarkMode],
  );

  // Unified skeleton display condition
  const shouldShowSkeleton = isLoading || isInitialLoading;

  return (
    <div className="home-page">
      <div className="container">
        <div className="header-section">
          <h1>Employee Management System</h1>
          <div className="header-controls">
            <div className="employee-count">
              <span className="count-badge">
                Total Employees: {employeeCount}
              </span>
            </div>
            <button
              className="btn theme-toggle"
              onClick={toggleTheme}
              title={themeTitle}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* Bulk Operations Section */}
        <div className="bulk-operations">
          <div className="bulk-actions">
            <div className="generate-section">
              <label htmlFor="generateCount" className="generate-label">
                Generate Employees:
              </label>
              <input
                id="generateCount"
                type="number"
                min="1"
                max="10000"
                value={generateCount}
                onChange={(e) => setGenerateCount(e.target.value)}
                className="generate-input"
                placeholder="Enter number"
              />
              <button
                className="btn btn-success generate-btn"
                onClick={handleGenerateEmployeesWrapper}
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate"}
              </button>
            </div>
            <button
              className="btn btn-danger delete-all-btn"
              onClick={handleDeleteAllWrapper}
              disabled={isLoading || employeeCount === 0}
            >
              Delete All Employees
            </button>
          </div>
        </div>

        <div className="actions-bar">
          <button
            className="btn btn-primary add-btn"
            onClick={handleAddNewEmployee}
          >
            Add Employee
          </button>
        </div>

        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={modalTitle}
          isLoading={isLoading}
          showFooter={false}
        >
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        </Modal>

        <FilterBar
          searchTerm={localSearch}
          onSearchChange={handleSearchChange}
          departmentFilter={filters.department}
          onDepartmentChange={handleDepartmentChange}
          statusFilter={filters.status}
          onStatusChange={handleStatusChange}
          departments={departments}
          isSearchDebouncing={isSyncDebouncing}
          onClearFilters={handleClearFilters}
        />

        <div className="results-info">
          <p>
            Showing {paginatedCount} of {filteredCount} employees
          </p>
        </div>

        <div className="employees-grid">
          {shouldShowSkeleton ? (
            Array.from({ length: 5 }, (_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : paginatedEmployees.length > 0 ? (
            paginatedEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
              />
            ))
          ) : (
            <div className="no-employees">
              <p>No employees found matching your criteria.</p>
            </div>
          )}
        </div>

        <Pagination
          currentPage={paginationInfo.currentPage}
          totalPages={paginationInfo.totalPages}
          goToPage={handlePageChange}
          goToNextPage={() => handlePageChange(paginationInfo.currentPage + 1)}
          goToPreviousPage={() =>
            handlePageChange(paginationInfo.currentPage - 1)
          }
        />
      </div>
    </div>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
