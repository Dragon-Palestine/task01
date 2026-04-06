import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { employeeReducer, initialState } from "./employeeReducer";
import { API_SIMULATION_DELAYS } from "../constants";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  // الـ Actions المغلفة بـ useCallback لضمان الأداء
  const setFilter = useCallback((filters) => {
    dispatch({ type: "SET_FILTER", payload: filters });
  }, []);

  const changePage = useCallback((page) => {
    dispatch({ type: "SET_LOADING", payload: true });
    setTimeout(() => {
      dispatch({ type: "CHANGE_PAGE", payload: page });
      dispatch({ type: "SET_LOADING", payload: false });
    }, API_SIMULATION_DELAYS?.DEFAULT || 500);
  }, []);

  const initFromUrl = useCallback((data) => {
    dispatch({ type: "INIT_FROM_URL", payload: data });
  }, []);

  const setLoading = useCallback((isLoading) => {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  }, []);

  const value = {
    ...state,
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
