import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useTheme } from "../context/ThemeContext";
import { useEmployeeFilters } from "../hooks/useEmployeeFilters";
import { usePagination } from "../hooks/usePagination";
import EmployeeCard from "../components/EmployeeCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import SkeletonLoader from "../components/SkeletonLoader";
import Modal from "../components/Modal";
import EmployeeForm from "../components/EmployeeForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { MAX_GENERATE_COUNT, ERROR_MESSAGES } from "../constants";

const HomePage = () => {
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

  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPreparingModal, setIsPreparingModal] = useState(false);
  const [generateCount, setGenerateCount] = useState(10);

  const handleAddEmployee = useCallback(
    async (employeeData) => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      addEmployee(employeeData);
      setShowModal(false);
      setIsLoading(false);
    },
    [addEmployee],
  );

  const handleUpdateEmployee = useCallback(
    async (employeeData) => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      updateEmployee(employeeData);
      setShowModal(false);
      setEditingEmployee(null);
      setIsLoading(false);
    },
    [updateEmployee],
  );

  const handleEditEmployee = useCallback((employee) => {
    setIsPreparingModal(true);
    setTimeout(() => {
      setEditingEmployee(employee);
      setShowModal(true);
      setIsPreparingModal(false);
    }, 700);
  }, []);

  const handleAddNewEmployee = useCallback(() => {
    setIsPreparingModal(true);
    setTimeout(() => {
      setEditingEmployee(null);
      setShowModal(true);
      setIsPreparingModal(false);
    }, 700);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditingEmployee(null);
  }, []);

  useEffect(() => {
    const initialLoadTimer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800);

    return () => clearTimeout(initialLoadTimer);
  }, []);

  const handleDeleteEmployee = useCallback(
    async (id) => {
      if (window.confirm("Are you sure you want to delete this employee?")) {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        deleteEmployee(id);
        setIsLoading(false);
      }
    },
    [deleteEmployee],
  );

  const handleDeleteAllEmployees = useCallback(async () => {
    if (
      window.confirm(
        `Are you sure you want to delete all ${employees.length} employees? This action cannot be undone.`,
      )
    ) {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      deleteAllEmployees();
      setIsLoading(false);
    }
  }, [employees.length, deleteAllEmployees]);

  const handleGenerateEmployees = useCallback(async () => {
    const count = parseInt(generateCount);
    if (isNaN(count) || count <= 0 || count > MAX_GENERATE_COUNT) {
      alert(ERROR_MESSAGES.GENERATE_COUNT_INVALID);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    generateEmployees(count);
    setIsLoading(false);
  }, [generateCount, generateEmployees]);

  if (isInitialLoading || isPreparingModal) {
    return (
      <div className="page-loader">
        <LoadingSpinner
          message={
            isInitialLoading ? "Loading employees..." : "Preparing data..."
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
                Total Employees: {employees.length}
              </span>
            </div>
            <button
              className="btn theme-toggle"
              onClick={toggleTheme}
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
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
                onClick={handleGenerateEmployees}
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate"}
              </button>
            </div>
            <button
              className="btn btn-danger delete-all-btn"
              onClick={handleDeleteAllEmployees}
              disabled={isLoading || employees.length === 0}
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
          title={editingEmployee ? "Edit Employee" : "Add New Employee"}
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
            Showing {paginatedItems.length} of {filteredEmployees.length}{" "}
            employees
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
};

export default HomePage;
