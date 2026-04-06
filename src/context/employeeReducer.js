import { generatedEmployees, generateEmployees } from "../utils/employeeData";
import { ITEMS_PER_PAGE } from "../constants";

export const initialState = {
  data: generatedEmployees,
  currentPage: 1,
  filters: {
    search: "",
    department: "",
    status: "",
  },
  isLoading: false,
};

const createId = () => Date.now() + Math.floor(Math.random() * 1000);

const applyFilters = (data, filters) => {
  return data.filter((employee) => {
    const matchesSearch =
      !filters.search ||
      employee.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      employee.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      employee.department
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      employee.role.toLowerCase().includes(filters.search.toLowerCase());

    const matchesDepartment =
      !filters.department || employee.department === filters.department;

    const matchesStatus = !filters.status || employee.status === filters.status;

    return matchesSearch && matchesDepartment && matchesStatus;
  });
};

export const employeeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return {
        ...state,
        data: [{ id: createId(), ...action.payload }, ...state.data],
      };

    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        data: state.data.map((employee) =>
          String(employee.id) === String(action.payload.id)
            ? { ...employee, ...action.payload }
            : employee,
        ),
      };

    case "DELETE_EMPLOYEE":
      return {
        ...state,
        data: state.data.filter(
          (employee) => String(employee.id) !== String(action.payload),
        ),
      };

    case "DELETE_ALL_EMPLOYEES":
      return {
        ...state,
        data: [],
      };

    case "GENERATE_EMPLOYEES":
      return {
        ...state,
        data: [
          ...state.data,
          ...generateEmployees(action.payload).map((employee) => ({
            ...employee,
            id: createId() + Math.random(),
          })),
        ],
      };

    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1, // Reset to first page when filtering
      };

    case "CHANGE_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };

    case "INIT_FROM_URL":
      return {
        ...state,
        ...action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

// Selectors
export const selectFilteredEmployees = (state) => {
  return applyFilters(state.data, state.filters);
};

export const selectPaginatedEmployees = (state) => {
  const filtered = selectFilteredEmployees(state);
  const startIndex = (state.currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return filtered.slice(startIndex, endIndex);
};

export const selectPaginationInfo = (state) => {
  const filtered = selectFilteredEmployees(state);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  return {
    currentPage: state.currentPage,
    totalPages,
    totalItems: filtered.length,
    itemsPerPage: ITEMS_PER_PAGE,
  };
};
