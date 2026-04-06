import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectEmployeesData,
  selectEmployeesState,
} from "../features/employees/employeesSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useSelector(selectEmployeesData);
  const { isPageLoading, isMutating } = useSelector(selectEmployeesState);

  // Simulate employee data fetching delay
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setIsSimulating(true);
    const timer = setTimeout(() => setIsSimulating(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  const isLoading = isPageLoading || isMutating || isSimulating;

  // Find employee with ID type compatibility check
  const employee = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data.find((emp) => String(emp.id) === String(id));
  }, [data, id]);

  // Display loading screen during simulation or actual fetching
  if (isLoading) {
    return <LoadingSpinner message="Fetching employee data..." />;
  }

  // Prevent 404 from appearing during initial data loading
  if (!employee && !isLoading) {
    return (
      <div className="not-found-page">
        <div className="container">
          <div className="error-content">
            <h1>404 - Employee Not Found</h1>
            <p>Sorry, the requested employee was not found in our system.</p>
            <div className="error-actions">
              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-3xl mt-10">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
          >
            <span className="mr-2">←</span> Back to List
          </button>
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${employee.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {employee.status}
          </span>
        </div>

        <div className="p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl text-white font-bold shadow-inner">
            {employee.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              {employee.name}
            </h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">
              {employee.role}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-gray-50 dark:bg-gray-900/50">
          <div className="space-y-1">
            <label className="text-sm text-gray-500 uppercase tracking-wider">
              Department
            </label>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {employee.department}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-500 uppercase tracking-wider">
              Email Address
            </label>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {employee.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
