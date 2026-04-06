import { useMemo } from "react";

export const useEmployeeFilters = (employees) => {
  const departments = useMemo(() => {
    const list = employees || [];
    return [...new Set(list.map((emp) => emp.department))].filter(Boolean);
  }, [employees]);

  return { departments };
};
