import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { employeeReducer, initialState } from "./employeeReducer";
import { API_SIMULATION_DELAYS, PAGINATION_CONFIG } from "../constants";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);
  const ITEMS_PER_PAGE = PAGINATION_CONFIG?.ITEMS_PER_PAGE || 10;

  // Actions wrapped in useCallback for performance optimization
  const setFilter = useCallback((filters) => {
    dispatch({ type: "SET_FILTER", payload: filters });
  }, []);

  /**
   * Helper to perform data mutations with a loading state simulation.
   * This ensures a consistent UX across the app.
   */
  const performAsyncAction = useCallback(
    (actionType, payload, delay = API_SIMULATION_DELAYS.DEFAULT) => {
      dispatch({ type: "SET_LOADING", payload: true });
      return new Promise((resolve) => {
        setTimeout(() => {
          dispatch({ type: actionType, payload });
          dispatch({ type: "SET_LOADING", payload: false });
          resolve();
        }, delay);
      });
    },
    [],
  );

  const changePage = useCallback(
    (page) =>
      performAsyncAction(
        "CHANGE_PAGE",
        page,
        API_SIMULATION_DELAYS?.PAGE_CHANGE || 500,
      ),
    [performAsyncAction],
  );

  const initFromUrl = useCallback((data) => {
    dispatch({ type: "INIT_FROM_URL", payload: data });
  }, []);

  const setLoading = useCallback((isLoading) => {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  }, []);

  // Data mutation actions wrapped with async simulation
  const addEmployee = useCallback(
    (employeeData) => performAsyncAction("ADD_EMPLOYEE", employeeData),
    [performAsyncAction],
  );

  const updateEmployee = useCallback(
    (employeeData) => performAsyncAction("UPDATE_EMPLOYEE", employeeData),
    [performAsyncAction],
  );

  const deleteEmployee = useCallback(
    (id) => performAsyncAction("DELETE_EMPLOYEE", id),
    [performAsyncAction],
  );

  const deleteAllEmployees = useCallback(
    () => performAsyncAction("DELETE_ALL_EMPLOYEES"),
    [performAsyncAction],
  );

  const generateEmployees = useCallback(
    (count) =>
      performAsyncAction(
        "GENERATE_EMPLOYEES",
        count,
        API_SIMULATION_DELAYS.GENERATE,
      ),
    [performAsyncAction],
  );

  // Derived state: Filtering logic moved to context as requested
  const filteredEmployees = useMemo(() => {
    const { search, department, status } = state.filters;
    if (!state.data) return [];

    return state.data.filter((emp) => {
      const matchesSearch =
        !search ||
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase());
      const matchesDept = !department || emp.department === department;
      const matchesStatus = !status || emp.status === status;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [state.data, state.filters]);

  // Derived state: Pagination logic moved to context
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE) || 1;

  const paginatedEmployees = useMemo(() => {
    const startIndex = (state.currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEmployees, state.currentPage, ITEMS_PER_PAGE]);

  // Centralized pagination metadata
  const paginationInfo = useMemo(
    () => ({
      currentPage: state.currentPage,
      totalPages,
      totalItems: filteredEmployees.length,
      itemsPerPage: ITEMS_PER_PAGE,
    }),
    [state.currentPage, totalPages, filteredEmployees.length, ITEMS_PER_PAGE],
  );

  const value = {
    ...state,
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
    initFromUrl,
    setLoading,
    dispatch,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider",
    );
  }
  return context;
};
