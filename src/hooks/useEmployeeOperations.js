import React, { useState, useCallback } from "react";
import {
  confirmDelete,
  confirmDeleteAll,
  showAlert,
} from "../utils/apiUtils";
import {
  MAX_GENERATE_COUNT,
  ERROR_MESSAGES,
  API_SIMULATION_DELAYS,
} from "../constants";

// Custom hook for employee operations
export const useEmployeeOperations = (operations) => {
  const [isLoading] = useState(false);

  const addEmployee = useCallback(
    async (employeeData) => {
      await operations.addEmployee(employeeData);
    },
    [operations],
  );

  const updateEmployee = useCallback(
    async (employeeData) => {
      await operations.updateEmployee(employeeData);
    },
    [operations],
  );

  const deleteEmployee = useCallback(
    async (id) => {
      if (confirmDelete("Are you sure you want to delete this employee?")) {
        await operations.deleteEmployee(id);
      }
    },
    [operations],
  );

  const deleteAllEmployees = useCallback(
    async (count) => {
      if (confirmDeleteAll(count)) {
        await operations.deleteAllEmployees();
      }
    },
    [operations],
  );

  const generateEmployees = useCallback(
    async (count) => {
      const numCount = parseInt(count);
      if (isNaN(numCount) || numCount <= 0 || numCount > MAX_GENERATE_COUNT) {
        showAlert(ERROR_MESSAGES.GENERATE_COUNT_INVALID);
        return;
      }

      await operations.generateEmployees(numCount);
    },
    [operations],
  );

  return {
    isLoading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    deleteAllEmployees,
    generateEmployees,
  };
};

// Custom hook for modal management
export const useModalManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isPreparingModal] = useState(false);

  const openAddModal = useCallback(() => {
    setEditingEmployee(null);
    setShowModal(true);
  }, []);

  const openEditModal = useCallback((employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setEditingEmployee(null);
  }, []);

  return {
    showModal,
    editingEmployee,
    isPreparingModal,
    openAddModal,
    openEditModal,
    closeModal,
  };
};

// Custom hook for initial loading
export const useInitialLoading = (
  delay = API_SIMULATION_DELAYS.INITIAL_LOAD,
) => {
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isInitialLoading;
};
