import React, { useState, useCallback } from "react";
import {
  simulateApiCall,
  confirmDelete,
  confirmDeleteAll,
  showAlert,
  withLoading,
  prepareModal,
} from "../utils/apiUtils";
import {
  API_SIMULATION_DELAYS,
  MAX_GENERATE_COUNT,
  ERROR_MESSAGES,
} from "../constants";

// Custom hook for employee operations
export const useEmployeeOperations = (operations) => {
  const [isLoading, setIsLoading] = useState(false);

  const addEmployee = useCallback(
    async (employeeData) => {
      await withLoading(setIsLoading, async () => {
        await simulateApiCall();
        operations.addEmployee(employeeData);
      });
    },
    [operations],
  );

  const updateEmployee = useCallback(
    async (employeeData) => {
      await withLoading(setIsLoading, async () => {
        await simulateApiCall();
        operations.updateEmployee(employeeData);
      });
    },
    [operations],
  );

  const deleteEmployee = useCallback(
    async (id) => {
      if (confirmDelete("Are you sure you want to delete this employee?")) {
        await withLoading(setIsLoading, async () => {
          await simulateApiCall();
          operations.deleteEmployee(id);
        });
      }
    },
    [operations],
  );

  const deleteAllEmployees = useCallback(
    async (count) => {
      if (confirmDeleteAll(count)) {
        await withLoading(setIsLoading, async () => {
          await simulateApiCall();
          operations.deleteAllEmployees();
        });
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

      await withLoading(setIsLoading, async () => {
        await simulateApiCall(API_SIMULATION_DELAYS.GENERATE);
        operations.generateEmployees(numCount);
      });
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
  const [isPreparingModal, setIsPreparingModal] = useState(false);

  const openAddModal = useCallback(async () => {
    setIsPreparingModal(true);
    await prepareModal(() => {
      setEditingEmployee(null);
      setShowModal(true);
      setIsPreparingModal(false);
    });
  }, []);

  const openEditModal = useCallback(async (employee) => {
    setIsPreparingModal(true);
    await prepareModal(() => {
      setEditingEmployee(employee);
      setShowModal(true);
      setIsPreparingModal(false);
    });
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
