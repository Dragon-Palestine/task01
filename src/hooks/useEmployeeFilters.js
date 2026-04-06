import { useMemo, useState } from "react";

export const useEmployeeFilters = (employees) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment =
        !departmentFilter || employee.department === departmentFilter;
      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchTerm, departmentFilter]);

  const departments = useMemo(() => {
    const uniqueDepartments = [
      ...new Set(employees.map((emp) => emp.department)),
    ];
    return uniqueDepartments;
  }, [employees]);

  return {
    filteredEmployees,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    departments,
  };
};
