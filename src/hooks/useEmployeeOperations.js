import { useState, useCallback, useEffect } from "react";
import { API_SIMULATION_DELAYS } from "../constants";

// Custom hook for employee operations
// This hook was previously unused in HomePage.jsx and its logic was moved directly into HomePage.
// It's being removed for code cleanliness.

// Custom hook for modal management
export const useModalManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  // isPreparingModal was unused and has been removed.

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
    openAddModal,
    openEditModal,
    closeModal,
  };
};

// Custom hook for initial loading
export const useInitialLoading = (
  delay = API_SIMULATION_DELAYS.INITIAL_LOAD,
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isInitialLoading;
};

// Custom hook to simulate a loading delay whenever specific dependencies change.
// Moved from useSimulatedLoading.js to centralize hooks.
export const useSimulatedLoading = (dependencies, delay = 500) => {
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setIsSimulating(true);
    const timer = setTimeout(() => setIsSimulating(false), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return isSimulating;
};
