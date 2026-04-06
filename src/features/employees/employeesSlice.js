import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { generatedEmployees, generateEmployees } from "../../utils/employeeData";
import { API_SIMULATION_DELAYS, PAGINATION_CONFIG } from "../../constants";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const createId = () => Date.now() + Math.floor(Math.random() * 1000);

const ITEMS_PER_PAGE = PAGINATION_CONFIG?.ITEMS_PER_PAGE || 5;

const initialState = {
  data: generatedEmployees,
  currentPage: 1,
  filters: {
    search: "",
    department: "",
    status: "",
  },
  isMutating: false,
  isPageLoading: false,
  loadingMessage: "",
  error: null,
};

export const changePageAsync = createAsyncThunk(
  "employees/changePageAsync",
  async (page) => {
    await sleep(API_SIMULATION_DELAYS?.PAGE_CHANGE || 500);
    return page;
  },
);

export const addEmployeeAsync = createAsyncThunk(
  "employees/addEmployeeAsync",
  async (employeeData) => {
    await sleep(API_SIMULATION_DELAYS.DEFAULT);
    return { id: createId(), ...employeeData };
  },
);

export const updateEmployeeAsync = createAsyncThunk(
  "employees/updateEmployeeAsync",
  async (employeeData) => {
    await sleep(API_SIMULATION_DELAYS.DEFAULT);
    return employeeData;
  },
);

export const deleteEmployeeAsync = createAsyncThunk(
  "employees/deleteEmployeeAsync",
  async (id) => {
    await sleep(API_SIMULATION_DELAYS.DEFAULT);
    return id;
  },
);

export const deleteAllEmployeesAsync = createAsyncThunk(
  "employees/deleteAllEmployeesAsync",
  async () => {
    await sleep(API_SIMULATION_DELAYS.DEFAULT);
    return true;
  },
);

export const generateEmployeesAsync = createAsyncThunk(
  "employees/generateEmployeesAsync",
  async (count) => {
    await sleep(API_SIMULATION_DELAYS.GENERATE);
    return generateEmployees(count).map((employee) => ({
      ...employee,
      id: createId() + Math.random(),
    }));
  },
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    initFromUrl(state, action) {
      const next = action.payload || {};
      if (typeof next.currentPage === "number") state.currentPage = next.currentPage;
      if (next.filters) state.filters = { ...state.filters, ...next.filters };
    },
    setLoadingMessage(state, action) {
      state.loadingMessage = action.payload || "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePageAsync.pending, (state) => {
        state.isPageLoading = true;
        state.loadingMessage = "Loading page...";
      })
      .addCase(changePageAsync.fulfilled, (state, action) => {
        state.currentPage = action.payload;
        state.isPageLoading = false;
        state.loadingMessage = "";
      })
      .addCase(changePageAsync.rejected, (state, action) => {
        state.isPageLoading = false;
        state.loadingMessage = "";
        state.error = action.error?.message || "Failed to change page";
      })
      // IMPORTANT: addCase calls must come before addMatcher calls (RTK constraint)
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data];
      })
      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        state.data = state.data.map((emp) =>
          String(emp.id) === String(action.payload.id)
            ? { ...emp, ...action.payload }
            : emp,
        );
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (emp) => String(emp.id) !== String(action.payload),
        );
      })
      .addCase(deleteAllEmployeesAsync.fulfilled, (state) => {
        state.data = [];
      })
      .addCase(generateEmployeesAsync.fulfilled, (state, action) => {
        state.data = [...state.data, ...action.payload];
      })
      .addMatcher(
        (action) => action.type.startsWith("employees/") && action.type.endsWith("/pending") && action.type !== "employees/changePageAsync/pending",
        (state, action) => {
          state.isMutating = true;
          const type = action.type;
          if (type.includes("delete")) state.loadingMessage = "Deleting...";
          else if (type.includes("generate")) state.loadingMessage = "Generating...";
          else state.loadingMessage = "Saving...";
        },
      )
      .addMatcher(
        (action) => action.type.startsWith("employees/") && action.type.endsWith("/rejected") && action.type !== "employees/changePageAsync/rejected",
        (state, action) => {
          state.isMutating = false;
          state.loadingMessage = "";
          state.error = action.error?.message || "Request failed";
        },
      )
      .addMatcher(
        (action) => action.type.startsWith("employees/") && action.type.endsWith("/fulfilled") && action.type !== "employees/changePageAsync/fulfilled",
        (state) => {
          state.isMutating = false;
          state.loadingMessage = "";
        },
      );
  },
});

export const { setFilter, initFromUrl, setLoadingMessage } =
  employeesSlice.actions;

export default employeesSlice.reducer;

// Selectors (memoized)
export const selectEmployeesState = (state) => state.employees;
export const selectEmployeesData = (state) => state.employees.data;
export const selectFilters = (state) => state.employees.filters;
export const selectCurrentPage = (state) => state.employees.currentPage;
export const selectIsMutating = (state) => state.employees.isMutating;
export const selectIsPageLoading = (state) => state.employees.isPageLoading;
export const selectLoadingMessage = (state) => state.employees.loadingMessage;

export const selectFilteredEmployees = createSelector(
  [selectEmployeesData, selectFilters],
  (data, filters) => {
    const { search, department, status } = filters;
    if (!data) return [];
    const s = (search || "").trim().toLowerCase();
    return data.filter((emp) => {
      const matchesSearch =
        !s ||
        emp.name.toLowerCase().includes(s) ||
        emp.email.toLowerCase().includes(s);
      const matchesDept = !department || emp.department === department;
      const matchesStatus = !status || emp.status === status;
      return matchesSearch && matchesDept && matchesStatus;
    });
  },
);

export const selectPaginationInfo = createSelector(
  [selectCurrentPage, selectFilteredEmployees],
  (currentPage, filtered) => {
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    return {
      currentPage,
      totalPages,
      totalItems: filtered.length,
      itemsPerPage: ITEMS_PER_PAGE,
    };
  },
);

export const selectPaginatedEmployees = createSelector(
  [selectFilteredEmployees, selectCurrentPage],
  (filtered, currentPage) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  },
);

