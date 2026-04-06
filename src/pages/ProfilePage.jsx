import React, { useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import {
  selectEmployeesData,
  selectEmployeesState,
} from "../features/employees/employeesSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { LOADING_MESSAGES } from "../constants";

const ProfilePage = React.memo(() => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const employees = useSelector(selectEmployeesData);
  const { isPageLoading, isMutating } = useSelector(selectEmployeesState);
  const isLoading = isPageLoading || isMutating;
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  // Find employee by ID
  const employee = useMemo(
    () => employees.find((emp) => String(emp.id) === String(id)),
    [employees, id],
  );

  const themeTitle = useMemo(
    () => (isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"),
    [isDarkMode],
  );

  // Show loading spinner while data is loading
  if (isLoading) {
    return (
      <div className="page-loader">
        <LoadingSpinner message={LOADING_MESSAGES.INITIAL} />
      </div>
    );
  }

  // Show 404 page if employee not found
  if (!employee) {
    return (
      <div className="not-found-page">
        <div className="container">
          <div className="error-content">
            <h1>404 - Employee Not Found</h1>
            <p>The employee you're looking for doesn't exist in our system.</p>
            <div className="error-actions">
              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>
              <button
                className="btn theme-toggle"
                onClick={() => dispatch(toggleTheme())}
                title={themeTitle}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="header-section">
          <h1>Employee Profile</h1>
          <div className="header-controls">
            <Link to="/" className="btn btn-secondary">
              ← Back to List
            </Link>
            <button
              className="btn theme-toggle"
              onClick={() => dispatch(toggleTheme())}
              title={themeTitle}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <span className="avatar-text">
                  {employee.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="profile-info">
                <h2>{employee.name}</h2>
                <span className={`status-badge ${employee.status}`}>
                  {employee.status}
                </span>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <strong>Email:</strong>
                <span>{employee.email}</span>
              </div>
              <div className="detail-item">
                <strong>Department:</strong>
                <span>{employee.department}</span>
              </div>
              <div className="detail-item">
                <strong>Role:</strong>
                <span>{employee.role}</span>
              </div>
              <div className="detail-item">
                <strong>Employee ID:</strong>
                <span>#{employee.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProfilePage.displayName = "ProfilePage";

export default ProfilePage;
