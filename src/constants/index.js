// API Constants
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";

// Pagination Constants
export const ITEMS_PER_PAGE = 5;
export const MAX_GENERATE_COUNT = 10000;

// Validation Constants
export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  DEPARTMENT: {
    MIN_LENGTH: 2,
  },
  ROLE: {
    MIN_LENGTH: 2,
  },
};

// Debounce Constants
export const SEARCH_DEBOUNCE_DELAY = 1000; // 1 second

// Animation Constants
export const ANIMATION_DURATIONS = {
  MODAL_FADE: 300,
  MODAL_SLIDE: 300,
  BUTTON_HOVER: 200,
  INPUT_FOCUS: 200,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: "employee_app_theme",
  SEARCH_TERM: "employee_app_search",
  DEPARTMENT_FILTER: "employee_app_department",
};

// Error Messages
export const ERROR_MESSAGES = {
  NAME_REQUIRED: "Name is required",
  NAME_TOO_SHORT: "Name must be at least 2 characters",
  NAME_TOO_LONG: "Name must be less than 50 characters",
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email address",
  DEPARTMENT_REQUIRED: "Department is required",
  DEPARTMENT_TOO_SHORT: "Department must be at least 2 characters",
  ROLE_REQUIRED: "Role is required",
  ROLE_TOO_SHORT: "Role must be at least 2 characters",
  GENERATE_COUNT_INVALID: "Please enter a valid number between 1 and 10,000",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  EMPLOYEE_ADDED: "Employee added successfully",
  EMPLOYEE_UPDATED: "Employee updated successfully",
  EMPLOYEE_DELETED: "Employee deleted successfully",
  EMPLOYEES_DELETED: "All employees deleted successfully",
  EMPLOYEES_GENERATED: "Employees generated successfully",
};
