import { useEffect, useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changePageAsync,
  initFromUrl,
  selectCurrentPage,
  selectFilters,
  setFilter,
} from "../features/employees/employeesSlice";
import { SEARCH_DEBOUNCE_DELAY } from "../constants";

export const useUrlSync = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const filters = useSelector(selectFilters);

  // Local state for the search input to ensure zero lag while typing
  const [localSearch, setLocalSearch] = useState(filters.search);

  // Sync local search with global state if global changes (e.g., clearing filters)
  useEffect(() => {
    setLocalSearch(filters.search);
  }, [filters.search]);

  // Debounce effect: Update global state/URL 500ms after typing stops
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        dispatch(setFilter({ search: localSearch }));
      }
    }, SEARCH_DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [localSearch, filters.search, dispatch]);

  // Initialize state from URL on mount
  const syncFromUrl = useCallback(() => {
    const urlPage = parseInt(searchParams.get("page")) || 1;
    const urlSearch = searchParams.get("search") || "";
    const urlDept = searchParams.get("dept") || "";
    const urlStatus = searchParams.get("status") || "";

    dispatch(
      initFromUrl({
        currentPage: urlPage,
        filters: {
          search: urlSearch,
          department: urlDept,
          status: urlStatus,
        },
      }),
    );
  }, [searchParams, dispatch]);

  useEffect(() => {
    syncFromUrl();
  }, []); // Only on mount

  // Update URL when state changes
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    if (filters.search) {
      params.set("search", filters.search);
    }

    if (filters.department) {
      params.set("dept", filters.department);
    }

    if (filters.status) {
      params.set("status", filters.status);
    }

    const newSearch = params.toString();
    const currentSearch = window.location.search.substring(1);

    if (newSearch !== currentSearch) {
      navigate(`/?${newSearch}`, { replace: true });
    }
  }, [currentPage, filters, navigate]);

  // Sync URL when page changes
  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  // Programmatic navigation functions
  const goToPage = useCallback(
    (page) => {
      dispatch(changePageAsync(page));
    },
    [dispatch],
  );

  // Update local state immediately; the useEffect above handles the global sync
  const setSearchFilter = useCallback((search) => {
    setLocalSearch(search);
  }, []);

  const setDepartmentFilter = useCallback(
    (department) => {
      dispatch(setFilter({ department }));
    },
    [dispatch],
  );

  const setStatusFilter = useCallback(
    (status) => {
      dispatch(setFilter({ status }));
    },
    [dispatch],
  );

  const clearFilters = useCallback(() => {
    dispatch(setFilter({ search: "", department: "", status: "" }));
  }, [dispatch]);

  const isSearchDebouncing = localSearch !== filters.search;

  return {
    goToPage,
    setSearchFilter,
    setDepartmentFilter,
    setStatusFilter,
    clearFilters,
    localSearch,
    isSearchDebouncing,
  };
};
