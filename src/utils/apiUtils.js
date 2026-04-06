// API simulation utilities
import { API_SIMULATION_DELAYS } from "../constants";

export const simulateApiCall = (delay = API_SIMULATION_DELAYS.DEFAULT) =>
  new Promise((resolve) => setTimeout(resolve, delay));

// Confirm dialog utilities
export const confirmDelete = (
  message = "Are you sure you want to delete this item?",
) => window.confirm(message);

export const confirmDeleteAll = (count) =>
  window.confirm(
    `Are you sure you want to delete all ${count} items? This action cannot be undone.`,
  );

// Alert utilities
export const showAlert = (message) => {
  alert(message);
};

// Loading state utilities
export const createLoadingState = () => ({
  isLoading: false,
  setLoading: null,
  withLoading: null,
});

export const withLoading = async (setLoading, asyncFn) => {
  setLoading(true);
  try {
    await asyncFn();
  } finally {
    setLoading(false);
  }
};

// Modal preparation utilities
export const prepareModal = (
  callback,
  delay = API_SIMULATION_DELAYS.MODAL_PREPARE,
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
};
