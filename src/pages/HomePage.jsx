import React, { useState, useMemo, useCallback } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useTheme } from "../context/ThemeContext";
import { useEmployeeFilters } from "../hooks/useEmployeeFilters";
import { usePagination } from "../hooks/usePagination";
import { useEmployeeOperations } from "../hooks/useEmployeeOperations";
import { useModalManager } from "../hooks/useEmployeeOperations";
import { useInitialLoading } from "../hooks/useEmployeeOperations";
import EmployeeCard from "../components/EmployeeCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import SkeletonLoader from "../components/SkeletonLoader";
import Modal from "../components/Modal";
import EmployeeForm from "../components/EmployeeForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { LOADING_MESSAGES } from "../constants";

const HomePage = React.memo(() => {
  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    deleteAllEmployees,
    generateEmployees,
  } = useEmployeeContext();

  const { isDarkMode, toggleTheme } = useTheme();

  const {
    filteredEmployees,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    departments,
    isSearchDebouncing,
  } = useEmployeeFilters(employees);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  } = usePagination(filteredEmployees, 5);

  const {
    isLoading,
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

  const handleGenerateEmployeesWrapper = useCallback(async () => {
    await handleGenerateEmployees(generateCount);
  }, [handleGenerateEmployees, generateCount]);

  // Memoized computed values
  const employeeCount = useMemo(() => employees.length, [employees.length]);
  const filteredCount = useMemo(
    () => filteredEmployees.length,
    [filteredEmployees.length],
  );
  const paginatedCount = useMemo(
    () => paginatedItems.length,
    [paginatedItems.length],
  );

  const themeTitle = useMemo(
    () => (isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"),
    [isDarkMode],
  );

  const modalTitle = useMemo(
    () => (editingEmployee ? "Edit Employee" : "Add New Employee"),
    [editingEmployee],
  );

  if (isInitialLoading || isPreparingModal) {
    return (
      <div className="page-loader">
        <LoadingSpinner
          message={
            isInitialLoading
              ? LOADING_MESSAGES.INITIAL
              : LOADING_MESSAGES.PREPARING
          }
        />
      </div>
    );
  }

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
              onClick={handleDeleteAllEmployees}
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
            onSubmit={
              editingEmployee ? handleUpdateEmployee : handleAddEmployee
            }
            isLoading={isLoading}
          />
        </Modal>

        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          departments={departments}
          isSearchDebouncing={isSearchDebouncing}
        />

        <div className="results-info">
          <p>
            Showing {paginatedCount} of {filteredCount} employees
          </p>
        </div>

        <div className="employees-grid">
          {isLoading ? (
            Array.from({ length: 5 }, (_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : paginatedItems.length > 0 ? (
            paginatedItems.map((employee) => (
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
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      </div>
    </div>
  );
});

HomePage.displayName = "HomePage";

export default HomePage;
