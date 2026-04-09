import React, { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectEmployeesData,
  selectEmployeesState,
} from "../features/employees/employeesSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSimulatedLoading } from "../hooks/useEmployeeOperations"; // Unified hook import
import NotFoundPage from "./NotFoundPage"; // Import the new NotFoundPage
import "./EmployeeProfile.css";

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useSelector(selectEmployeesData);
  const { isPageLoading, isMutating } = useSelector(selectEmployeesState);
  const isSimulating = useSimulatedLoading([id]); // Use the unified hook
  const isLoading = isPageLoading || isMutating || isSimulating;

  const employee = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data.find((emp) => String(emp.id) === String(id));
  }, [data, id]);

  if (isLoading) {
    return <LoadingSpinner message="Fetching employee data..." />;
  }
  if (!employee) {
    return <NotFoundPage />; // Render NotFoundPage if employee is not found
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Back */}
        <div className="profile-top">
          <button onClick={() => navigate("/")} className="back-btn">
            ← Back
          </button>
        </div>

        {/* Card */}
        <div className="profile-card">
          <div className="profile-cover"></div>

          <div className="profile-content">
            <div className="profile-header">
              <div className="profile-avatar">
                {employee.name.charAt(0).toUpperCase()}
              </div>

              <div className="profile-info">
                <div className="profile-name">{employee.name}</div>

                <div className={`status-badge ${employee.status}`}>
                  {employee.status}
                </div>

                <div className="profile-role">{employee.role}</div>
              </div>
            </div>

            <div className="profile-grid">
              <div className="profile-box">
                <div className="box-label">Department</div>
                <div className="box-value">{employee.department}</div>
              </div>

              <div className="profile-box">
                <div className="box-label">Email</div>
                <div className="box-value">{employee.email}</div>
              </div>

              <div className="profile-box" style={{ gridColumn: "span 2" }}>
                <div className="box-label">Employee ID</div>
                <div className="box-value">EMP-{employee.id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
