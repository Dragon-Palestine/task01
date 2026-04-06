import { generatedEmployees, generateEmployees } from "../utils/employeeData";

export const initialEmployees = generatedEmployees;

const createId = () => Number(`${Date.now()}`);

export const employeeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return [{ id: createId(), ...action.payload }, ...state];
    case "UPDATE_EMPLOYEE":
      return state.map((employee) =>
        employee.id === action.payload.id
          ? { ...employee, ...action.payload }
          : employee,
      );
    case "DELETE_EMPLOYEE":
      return state.filter((employee) => employee.id !== action.payload);
    case "DELETE_ALL_EMPLOYEES":
      return [];
    case "GENERATE_EMPLOYEES":
      return [
        ...state,
        ...generateEmployees(action.payload).map((employee) => ({
          ...employee,
          id: createId() + Math.random(),
        })),
      ];
    default:
      return state;
  }
};
