import React, { createContext, useContext, useReducer } from "react";
import { employeeReducer, initialEmployees } from "./employeeReducer";

const EmployeeContext = createContext();

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider",
    );
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, dispatch] = useReducer(employeeReducer, initialEmployees);

  const addEmployee = (employee) => {
    dispatch({ type: "ADD_EMPLOYEE", payload: employee });
  };

  const updateEmployee = (employee) => {
    dispatch({ type: "UPDATE_EMPLOYEE", payload: employee });
  };

  const deleteEmployee = (id) => {
    dispatch({ type: "DELETE_EMPLOYEE", payload: id });
  };

  const deleteAllEmployees = () => {
    dispatch({ type: "DELETE_ALL_EMPLOYEES" });
  };

  const generateEmployees = (count) => {
    dispatch({ type: "GENERATE_EMPLOYEES", payload: count });
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        deleteAllEmployees,
        generateEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
