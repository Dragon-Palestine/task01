import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { SEARCH_DEBOUNCE_DELAY } from "../constants";

export const useEmployeeFilters = (employees) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [isSearchDebouncing, setIsSearchDebouncing] = useState(false);

  // Debounce search term
  const debounceTimer = useRef(null);

  useEffect(() => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set debouncing state
    if (searchTerm !== debouncedSearchTerm) {
      setIsSearchDebouncing(true);
    }

    // Set new timer to update debounced search term after 1 second
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearchDebouncing(false);
    }, SEARCH_DEBOUNCE_DELAY);

    // Cleanup timer on unmount
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchTerm, debouncedSearchTerm]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        employee.email
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      const matchesDepartment =
        !departmentFilter || employee.department === departmentFilter;
      return matchesSearch && matchesDepartment;
    });
  }, [employees, debouncedSearchTerm, departmentFilter]);

  const departments = useMemo(() => {
    const uniqueDepartments = [
      ...new Set(employees.map((emp) => emp.department)),
    ];
    return uniqueDepartments;
  }, [employees]);

  const handleSetSearchTerm = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleSetDepartmentFilter = useCallback((filter) => {
    setDepartmentFilter(filter);
  }, []);

  return {
    filteredEmployees,
    searchTerm,
    setSearchTerm: handleSetSearchTerm,
    departmentFilter,
    setDepartmentFilter: handleSetDepartmentFilter,
    departments,
    isSearchDebouncing,
  };
};
