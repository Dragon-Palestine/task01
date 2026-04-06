// Employee types
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

// Form validation types
export interface ValidationErrors {
  name?: string;
  email?: string;
  department?: string;
  role?: string;
}

// Filter types
export interface EmployeeFilters {
  searchTerm: string;
  departmentFilter: string;
}

// Pagination types
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

// Modal types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  showFooter?: boolean;
}

// Component props types
export interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export interface EmployeeFormProps {
  employee?: Employee | null;
  onSubmit: (employee: Omit<Employee, "id">) => void;
  isLoading: boolean;
}

export interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (filter: string) => void;
  departments: string[];
  isSearchDebouncing: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}
